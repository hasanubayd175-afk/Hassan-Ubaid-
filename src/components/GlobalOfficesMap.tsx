import React, { useEffect, useRef, useState } from 'react';
import {
  AdvancedMarker,
  APIProvider,
  APILoadingStatus,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  useMap,
} from '@vis.gl/react-google-maps';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ExternalLink, Loader2, MapPin, RefreshCw } from 'lucide-react';
import { OFFICES } from '../data/kelvisData';
import { useLanguage } from '../i18n/LanguageContext';
import { OfficeLocation, RegionId } from '../types/kelvis';

interface GlobalOfficesMapProps {
  selectedRegionId: RegionId;
  focusTrigger?: number;
  onSelectRegion: (regionId: RegionId) => void;
  onBookInRegion: (regionId: RegionId) => void;
}

function useIsDarkTheme(): boolean {
  const [isDark, setIsDark] = useState<boolean>(() =>
    typeof document !== 'undefined'
      ? document.documentElement.classList.contains('dark')
      : false
  );

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const sync = () => setIsDark(root.classList.contains('dark'));
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

function createPinMarkerIcon(office: OfficeLocation, isSelected: boolean): L.DivIcon {
  const fill = isSelected ? '#D49A4A' : '#132C40';
  const stroke = isSelected ? '#FFFFFF' : '#2E96D8';
  const scale = isSelected ? 1.16 : 0.96;
  const width = Math.round(34 * scale);
  const height = Math.round(44 * scale);

  const wrapper = document.createElement('div');
  wrapper.style.width = `${width}px`;
  wrapper.style.height = `${height}px`;
  wrapper.style.display = 'flex';
  wrapper.style.alignItems = 'center';
  wrapper.style.justifyContent = 'center';
  wrapper.style.filter = isSelected
    ? 'drop-shadow(0 6px 12px rgba(14, 34, 51, 0.45))'
    : 'drop-shadow(0 3px 6px rgba(14, 34, 51, 0.35))';
  wrapper.style.cursor = 'pointer';

  wrapper.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 46" width="${width}" height="${height}" aria-hidden="true">
      <path d="M18 1.5C8.887 1.5 1.5 8.887 1.5 18c0 11.42 13.78 24.48 15.65 26.2a1.25 1.25 0 0 0 1.7 0C20.72 42.48 34.5 29.42 34.5 18 34.5 8.887 27.113 1.5 18 1.5Z" fill="${fill}" stroke="${stroke}" stroke-width="2.4"/>
      <circle cx="18" cy="17.5" r="7.5" fill="#FFFFFF" fill-opacity="0.18"/>
      <text x="18" y="20.5" text-anchor="middle" fill="#FFFFFF" font-family="ui-monospace, SFMono-Regular, monospace" font-size="8.2" font-weight="700">${office.hubCode}</text>
    </svg>
  `;

  return L.divIcon({
    html: wrapper,
    className: 'kelvix-leaflet-pin',
    iconSize: [width, height],
    iconAnchor: [Math.round(width / 2), height],
    popupAnchor: [0, -height + 6],
  });
}

function buildPopupContent(
  office: OfficeLocation,
  bookLabel: string,
  onBook: (id: RegionId) => void
): HTMLElement {
  const container = document.createElement('div');
  container.style.minWidth = '210px';
  container.style.maxWidth = '250px';
  container.style.padding = '2px';
  container.style.color = '#0f172a';
  container.style.fontFamily = 'DM Sans, ui-sans-serif, system-ui, sans-serif';

  const title = document.createElement('p');
  title.textContent = `Kelvix Solutions · ${office.city}`;
  title.style.fontSize = '12px';
  title.style.fontWeight = '700';
  title.style.color = '#132C40';
  title.style.margin = '0 0 3px 0';
  container.appendChild(title);

  const addr1 = document.createElement('p');
  addr1.textContent = office.addressLine1;
  addr1.style.fontSize = '12px';
  addr1.style.color = '#475569';
  addr1.style.margin = '0';
  container.appendChild(addr1);

  const addr2 = document.createElement('p');
  addr2.textContent = office.addressLine2;
  addr2.style.fontSize = '12px';
  addr2.style.color = '#475569';
  addr2.style.margin = '0 0 8px 0';
  container.appendChild(addr2);

  const footer = document.createElement('div');
  footer.style.display = 'flex';
  footer.style.alignItems = 'center';
  footer.style.justifyContent = 'space-between';
  footer.style.gap = '8px';
  footer.style.paddingTop = '6px';
  footer.style.borderTop = '1px solid #e2e8f0';

  const phone = document.createElement('span');
  phone.dir = 'ltr';
  phone.textContent = office.phone;
  phone.style.fontFamily = 'JetBrains Mono, ui-monospace, monospace';
  phone.style.fontSize = '11px';
  phone.style.color = '#334155';
  footer.appendChild(phone);

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = bookLabel;
  btn.style.padding = '4px 10px';
  btn.style.fontSize = '11px';
  btn.style.fontWeight = '600';
  btn.style.backgroundColor = '#132C40';
  btn.style.color = '#ffffff';
  btn.style.borderRadius = '6px';
  btn.style.border = 'none';
  btn.style.cursor = 'pointer';
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    onBook(office.id);
  });
  footer.appendChild(btn);

  container.appendChild(footer);
  return container;
}

const MapLoadingSkeleton: React.FC<{
  variant: 'loading' | 'delayed' | 'error';
  title: string;
  subtitle: string;
  openMapsUrl: string;
  openMapsLabel: string;
  retryLabel: string;
  overlay?: boolean;
  visible?: boolean;
  onRetry?: () => void;
}> = ({
  variant,
  title,
  subtitle,
  openMapsUrl,
  openMapsLabel,
  retryLabel,
  overlay = false,
  visible = true,
  onRetry,
}) => {
  const isInteractive = variant === 'delayed' || variant === 'error';

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy={variant !== 'error'}
      aria-hidden={!visible}
      className={`${
        overlay
          ? `absolute inset-0 z-[480] transition-opacity duration-300 ${
              visible
                ? 'opacity-100'
                : 'opacity-0 pointer-events-none'
            }`
          : 'flex-1 min-h-[380px] sm:min-h-[420px] w-full relative'
      } overflow-hidden flex items-center justify-center bg-slate-100 dark:bg-[#0B1926] ${
        !isInteractive && overlay ? 'pointer-events-none' : ''
      }`}
    >
      {/* Subtle architectural map grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(19,44,64,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(19,44,64,0.06)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:36px_36px]"
      />

      {/* Shimmer road & district skeleton placeholders */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none animate-pulse motion-reduce:animate-none"
      >
        <div className="absolute top-[22%] left-[8%] w-36 h-3 rounded-full bg-slate-300/60 dark:bg-slate-700/45 -rotate-6" />
        <div className="absolute top-[38%] right-[12%] w-44 h-2.5 rounded-full bg-slate-300/55 dark:bg-slate-700/40 rotate-12" />
        <div className="absolute bottom-[28%] left-[18%] w-48 h-2.5 rounded-full bg-slate-300/50 dark:bg-slate-700/35 rotate-3" />
        <div className="absolute top-[16%] right-[24%] w-20 h-14 rounded-lg bg-slate-200/75 dark:bg-slate-800/55" />
        <div className="absolute bottom-[18%] right-[14%] w-28 h-12 rounded-lg bg-slate-200/75 dark:bg-slate-800/55" />

        {/* Subtle placeholder hub pin beacons */}
        <span className="absolute top-[30%] left-[26%] w-3 h-3 rounded-full bg-[#1D72B8]/35 ring-4 ring-[#1D72B8]/15" />
        <span className="absolute top-[42%] right-[32%] w-3 h-3 rounded-full bg-[#D49A4A]/45 ring-4 ring-[#D49A4A]/15" />
        <span className="absolute bottom-[32%] left-[44%] w-2.5 h-2.5 rounded-full bg-[#2E96D8]/35 ring-4 ring-[#2E96D8]/15" />

        {/* Corner control skeletons matching live map controls */}
        <div className="absolute top-3 left-3 w-28 h-7 rounded-lg bg-white/80 dark:bg-[#132C40]/80 border border-slate-200/70 dark:border-white/10" />
        <div className="absolute top-3 right-3 w-8 h-16 rounded-lg bg-white/80 dark:bg-[#132C40]/80 border border-slate-200/70 dark:border-white/10" />
        <div className="hidden sm:block absolute bottom-3 left-3 w-24 h-7 rounded-lg bg-white/80 dark:bg-[#132C40]/80 border border-slate-200/70 dark:border-white/10" />
      </div>

      {/* Centered frosted status card with subtle spinner */}
      <div className="relative z-10 mx-4 max-w-xs w-full rounded-xl bg-white/92 dark:bg-[#102336]/92 backdrop-blur-md border border-slate-200/85 dark:border-white/12 shadow-lg px-5 py-4 text-center">
        <div className="mx-auto mb-2.5 w-9 h-9 rounded-full bg-[#1D72B8]/10 dark:bg-[#D49A4A]/15 border border-[#1D72B8]/20 dark:border-[#D49A4A]/30 flex items-center justify-center">
          {variant === 'error' ? (
            <MapPin
              className="w-4 h-4 text-[#D49A4A]"
              aria-hidden="true"
            />
          ) : (
            <Loader2
              className="w-4 h-4 text-[#1D72B8] dark:text-[#D49A4A] animate-spin motion-reduce:animate-none"
              aria-hidden="true"
            />
          )}
        </div>

        <p className="font-display text-sm font-semibold text-[#132C40] dark:text-white leading-snug">
          {title}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 tabular-nums">
          {subtitle}
        </p>

        {isInteractive && (
          <div className="mt-3.5 pt-3 border-t border-slate-200/80 dark:border-white/10 flex flex-wrap items-center justify-center gap-2">
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#132C40] dark:bg-[#1D72B8] hover:bg-[#1D72B8] dark:hover:bg-[#2E96D8] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3 shrink-0" aria-hidden="true" />
                <span>{retryLabel}</span>
              </button>
            )}
            <a
              href={openMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-[#132C40] dark:text-white text-xs font-semibold transition-colors"
            >
              <span>{openMapsLabel}</span>
              <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

const InteractiveLeafletHubMap: React.FC<{
  selectedRegionId: RegionId;
  viewAll: boolean;
  openInfoId: RegionId | null;
  onSelectHub: (id: RegionId) => void;
  onCloseInfo: (id: RegionId) => void;
  onBookHub: (id: RegionId) => void;
  openMapsLabel: string;
  allHubsLabel: string;
  activeRegionLabel: string;
  bookLabel: string;
  loadingTitle: string;
  unavailableTitle: string;
  retryLabel: string;
}> = ({
  selectedRegionId,
  viewAll,
  openInfoId,
  onSelectHub,
  onCloseInfo,
  onBookHub,
  openMapsLabel,
  allHubsLabel,
  activeRegionLabel,
  bookLabel,
  loadingTitle,
  unavailableTitle,
  retryLabel,
}) => {
  const isDark = useIsDarkTheme();
  const [tilesReady, setTilesReady] = useState(false);
  const [tilesFailed, setTilesFailed] = useState(false);
  const [tileRetryKey, setTileRetryKey] = useState(0);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<Record<RegionId, L.Marker> | null>(null);

  const onSelectHubRef = useRef(onSelectHub);
  const onCloseInfoRef = useRef(onCloseInfo);
  const onBookHubRef = useRef(onBookHub);
  onSelectHubRef.current = onSelectHub;
  onCloseInfoRef.current = onCloseInfo;
  onBookHubRef.current = onBookHub;

  const activeOffice =
    OFFICES.find((o) => o.id === selectedRegionId) || OFFICES[0];
  const externalMapsUrl = `https://www.google.com/maps/search/?api=1&query=${activeOffice.lat},${activeOffice.lng}`;

  // Initialize Leaflet map instance once
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container || mapInstanceRef.current) return;

    const map = L.map(container, {
      center: [activeOffice.lat, activeOffice.lng],
      zoom: 12,
      zoomControl: false,
      scrollWheelZoom: false,
      attributionControl: true,
    });

    map.attributionControl.setPrefix(false);
    L.control.zoom({ position: 'topright' }).addTo(map);

    const createdMarkers = {} as Record<RegionId, L.Marker>;
    OFFICES.forEach((office) => {
      const marker = L.marker([office.lat, office.lng], {
        icon: createPinMarkerIcon(office, !viewAll && office.id === selectedRegionId),
        title: `Kelvix Solutions — ${office.city}`,
        zIndexOffset: !viewAll && office.id === selectedRegionId ? 500 : 100,
      }).addTo(map);

      marker.bindPopup(
        buildPopupContent(office, bookLabel, (id) => onBookHubRef.current(id)),
        { maxWidth: 260, closeButton: true }
      );

      marker.on('click', () => {
        onSelectHubRef.current(office.id);
      });

      marker.on('popupclose', () => {
        onCloseInfoRef.current(office.id);
      });

      createdMarkers[office.id] = marker;
    });

    mapInstanceRef.current = map;
    markersRef.current = createdMarkers;

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            map.invalidateSize({ animate: false });
          })
        : null;
    resizeObserver?.observe(container);

    // Ensure crisp tile layout immediately after paint
    const rafId = requestAnimationFrame(() => {
      map.invalidateSize({ animate: false });
    });

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver?.disconnect();
      map.remove();
      mapInstanceRef.current = null;
      tileLayerRef.current = null;
      markersRef.current = null;
    };
  }, []);

  // Sync Esri World Street Map basemap (no API key required) with OSM fallback
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    setTilesReady(false);
    setTilesFailed(false);

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
      tileLayerRef.current = null;
    }

    const esriUrl =
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';

    let esriErrorCount = 0;
    let osmErrorCount = 0;
    let loadedTileCount = 0;
    let switchedToOsm = false;

    const layer = L.tileLayer(esriUrl, {
      maxZoom: 19,
      attribution:
        'Tiles &copy; <a href="https://www.esri.com/" target="_blank" rel="noopener noreferrer">Esri</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>',
    });

    layer.on('tileload', () => {
      loadedTileCount += 1;
      setTilesReady(true);
      setTilesFailed(false);
    });

    layer.on('load', () => {
      if (loadedTileCount > 0) {
        setTilesReady(true);
      }
    });

    layer.on('tileerror', () => {
      if (!switchedToOsm) {
        esriErrorCount += 1;
        if (esriErrorCount >= 3 && mapInstanceRef.current === map) {
          switchedToOsm = true;
          layer.setUrl('https://tile.openstreetmap.org/{z}/{x}/{y}.png');
        }
      } else {
        osmErrorCount += 1;
        if (osmErrorCount >= 4 && loadedTileCount === 0) {
          setTilesFailed(true);
        }
      }
    });

    layer.addTo(map);
    tileLayerRef.current = layer;

    const safetyRevealTimer = window.setTimeout(() => {
      if (loadedTileCount > 0) {
        setTilesReady(true);
      }
    }, 2400);

    return () => {
      window.clearTimeout(safetyRevealTimer);
    };
  }, [tileRetryKey]);

  // Keep marker icons, localized popup copy, and viewport synced
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markers = markersRef.current;
    if (!map || !markers) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    OFFICES.forEach((office) => {
      const marker = markers[office.id];
      if (!marker) return;
      const isSelected = viewAll || selectedRegionId === office.id;
      marker.setIcon(createPinMarkerIcon(office, isSelected));
      marker.setZIndexOffset(isSelected ? 500 : 100);
      marker.setPopupContent(
        buildPopupContent(office, bookLabel, (id) => onBookHubRef.current(id))
      );

      if (!viewAll && openInfoId === office.id) {
        if (!marker.isPopupOpen()) {
          marker.openPopup();
        }
      } else if (marker.isPopupOpen()) {
        marker.closePopup();
      }
    });

    if (viewAll) {
      const bounds = L.latLngBounds(
        OFFICES.map((o) => [o.lat, o.lng] as [number, number])
      );
      map.fitBounds(bounds, {
        padding: [52, 46],
        maxZoom: 6,
        animate: !prefersReducedMotion,
      });
      return;
    }

    const target = OFFICES.find((o) => o.id === selectedRegionId) || OFFICES[0];
    if (prefersReducedMotion) {
      map.setView([target.lat, target.lng], 12, { animate: false });
    } else {
      map.flyTo([target.lat, target.lng], 12, { duration: 0.75 });
    }
  }, [selectedRegionId, viewAll, openInfoId, bookLabel]);

  return (
    <div
      data-lenis-prevent
      className="flex-1 min-h-[380px] sm:min-h-[420px] w-full relative isolate z-0 bg-[#E5ECF4] dark:bg-[#0B1926]"
    >
      <div
        ref={mapContainerRef}
        dir="ltr"
        aria-label={`Interactive regional headquarters map — ${viewAll ? allHubsLabel : activeOffice.city}`}
        className={`w-full h-full min-h-[380px] sm:min-h-[420px] ${
          isDark
            ? '[&_.leaflet-tile-pane]:[filter:invert(92%)_hue-rotate(180deg)_brightness(92%)_contrast(92%)]'
            : ''
        }`}
      />

      <MapLoadingSkeleton
        overlay
        visible={!tilesReady || tilesFailed}
        variant={tilesFailed ? 'error' : 'loading'}
        title={tilesFailed ? unavailableTitle : loadingTitle}
        subtitle={
          viewAll
            ? 'London · Munich · Dubai'
            : `${activeOffice.city} (${activeOffice.lat.toFixed(2)}°, ${activeOffice.lng.toFixed(2)}°)`
        }
        openMapsUrl={externalMapsUrl}
        openMapsLabel={openMapsLabel}
        retryLabel={retryLabel}
        onRetry={
          tilesFailed
            ? () => {
                setTilesFailed(false);
                setTilesReady(false);
                setTileRetryKey((n) => n + 1);
              }
            : undefined
        }
      />

      <a
        href={externalMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-3 left-3 z-[450] inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/95 hover:bg-[#132C40] text-[#132C40] hover:text-white border border-slate-200 shadow-sm text-xs font-semibold transition-colors"
      >
        <span>{openMapsLabel}</span>
        <ExternalLink className="w-3 h-3 shrink-0" />
      </a>

      <div className="hidden sm:flex absolute bottom-3 left-3 z-[450] items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 border border-slate-200 shadow-sm text-xs font-semibold text-[#132C40] pointer-events-none">
        <MapPin className="w-3.5 h-3.5 text-[#1D72B8] shrink-0" aria-hidden="true" />
        <span>{viewAll ? allHubsLabel : activeRegionLabel}</span>
      </div>
    </div>
  );
};

const OfficeMarker: React.FC<{
  office: OfficeLocation;
  isSelected: boolean;
  isOpen: boolean;
  bookLabel: string;
  onSelect: () => void;
  onClose: () => void;
  onBook: () => void;
}> = ({ office, isSelected, isOpen, bookLabel, onSelect, onClose, onBook }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: office.lat, lng: office.lng }}
        title={`Kelvix Solutions — ${office.city}`}
        onClick={onSelect}
      >
        <Pin
          background={isSelected ? '#D49A4A' : '#132C40'}
          borderColor={isSelected ? '#FFFFFF' : '#2E96D8'}
          glyphColor="#FFFFFF"
          scale={isSelected ? 1.25 : 1.0}
        />
      </AdvancedMarker>
      {isOpen && marker && (
        <InfoWindow anchor={marker} maxWidth={260} onCloseClick={onClose}>
          <div className="p-1 text-slate-900">
            <p className="text-xs font-bold text-[#132C40] mb-0.5">
              Kelvix Solutions · {office.city}
            </p>
            <p className="text-xs text-slate-600">{office.addressLine1}</p>
            <p className="text-xs text-slate-600 mb-2">{office.addressLine2}</p>
            <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-slate-200">
              <span dir="ltr" className="font-mono text-[11px] text-slate-700 tabular-nums">
                {office.phone}
              </span>
              <button
                type="button"
                onClick={onBook}
                className="px-2.5 py-1 text-[11px] font-semibold bg-[#132C40] text-white rounded cursor-pointer"
              >
                {bookLabel}
              </button>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

const MapViewportController: React.FC<{
  targetOffice: OfficeLocation | null;
  viewAll: boolean;
}> = ({ targetOffice, viewAll }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    if (!viewAll && targetOffice) {
      map.panTo({ lat: targetOffice.lat, lng: targetOffice.lng });
      map.setZoom(12);
      return;
    }

    if (viewAll) {
      const lats = OFFICES.map((o) => o.lat);
      const lngs = OFFICES.map((o) => o.lng);
      map.fitBounds(
        {
          north: Math.max(...lats),
          south: Math.min(...lats),
          east: Math.max(...lngs),
          west: Math.min(...lngs),
        },
        { top: 56, right: 48, bottom: 56, left: 48 }
      );
    }
  }, [map, targetOffice, viewAll]);

  return null;
};

const InnerMapCanvas: React.FC<{
  selectedRegionId: RegionId;
  viewAll: boolean;
  openInfoId: RegionId | null;
  quotaExceeded: boolean;
  setViewAll: (v: boolean) => void;
  setOpenInfoId: React.Dispatch<React.SetStateAction<RegionId | null>>;
  onSelectRegion: (regionId: RegionId) => void;
  onBookInRegion: (regionId: RegionId) => void;
}> = ({
  selectedRegionId,
  viewAll,
  openInfoId,
  quotaExceeded,
  setViewAll,
  setOpenInfoId,
  onSelectRegion,
  onBookInRegion,
}) => {
  const status = useApiLoadingStatus();
  const { t } = useLanguage();
  const [tilesLoaded, setTilesLoaded] = useState(false);
  const [initDelayed, setInitDelayed] = useState(false);
  const [initTimedOut, setInitTimedOut] = useState(false);

  const isScriptLoading =
    status === APILoadingStatus.NOT_LOADED ||
    status === APILoadingStatus.LOADING;

  useEffect(() => {
    if (!isScriptLoading) {
      setInitDelayed(false);
      return;
    }

    const delayTimer = window.setTimeout(() => setInitDelayed(true), 4500);
    const timeoutTimer = window.setTimeout(() => setInitTimedOut(true), 9500);

    return () => {
      window.clearTimeout(delayTimer);
      window.clearTimeout(timeoutTimer);
    };
  }, [isScriptLoading]);

  useEffect(() => {
    if (status !== APILoadingStatus.LOADED) {
      setTilesLoaded(false);
      return;
    }

    const safetyReveal = window.setTimeout(() => setTilesLoaded(true), 2800);
    return () => window.clearTimeout(safetyReveal);
  }, [status]);

  const targetOffice = viewAll
    ? null
    : OFFICES.find((o) => o.id === selectedRegionId) || OFFICES[0];

  const activeOffice =
    OFFICES.find((o) => o.id === selectedRegionId) || OFFICES[0];
  const externalMapsUrl = `https://www.google.com/maps/search/?api=1&query=${activeOffice.lat},${activeOffice.lng}`;

  const getRegionLabel = (office: OfficeLocation) =>
    office.id === 'germany'
      ? t.regions.germany
      : office.id === 'dubai'
        ? t.regions.dubai
        : t.regions.london;

  const mapSubtitle = viewAll
    ? 'London · Munich · Dubai'
    : `${activeOffice.city} (${activeOffice.lat.toFixed(2)}°, ${activeOffice.lng.toFixed(2)}°)`;

  if (
    quotaExceeded ||
    initTimedOut ||
    status === APILoadingStatus.FAILED ||
    status === APILoadingStatus.AUTH_FAILURE
  ) {
    return (
      <InteractiveLeafletHubMap
        selectedRegionId={selectedRegionId}
        viewAll={viewAll}
        openInfoId={openInfoId}
        onSelectHub={(id) => {
          setViewAll(false);
          onSelectRegion(id);
          setOpenInfoId(id);
        }}
        onCloseInfo={(closedId) =>
          setOpenInfoId((prev) => (prev === closedId ? null : prev))
        }
        onBookHub={onBookInRegion}
        openMapsLabel={t.footer.openInMaps}
        allHubsLabel={t.footer.allHubs}
        activeRegionLabel={getRegionLabel(activeOffice)}
        bookLabel={t.clientsTeam.book}
        loadingTitle={t.footer.mapLoadingTitle}
        unavailableTitle={t.footer.mapUnavailableTitle}
        retryLabel={t.footer.mapRetry}
      />
    );
  }

  if (isScriptLoading) {
    return (
      <MapLoadingSkeleton
        variant={initDelayed ? 'delayed' : 'loading'}
        title={
          initDelayed ? t.footer.mapInitializingDelayed : t.footer.mapLoadingTitle
        }
        subtitle={mapSubtitle}
        openMapsUrl={externalMapsUrl}
        openMapsLabel={t.footer.openInMaps}
        retryLabel={t.footer.mapRetry}
      />
    );
  }

  return (
    <div data-lenis-prevent className="flex-1 min-h-[380px] sm:min-h-[420px] w-full relative">
      <GoogleMap
        mapId="DEMO_MAP_ID"
        defaultCenter={{ lat: activeOffice.lat, lng: activeOffice.lng }}
        defaultZoom={12}
        gestureHandling="cooperative"
        mapTypeControl={false}
        streetViewControl={false}
        fullscreenControl={true}
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        onTilesLoaded={() => setTilesLoaded(true)}
        style={{ width: '100%', height: '100%', minHeight: '380px' }}
      >
        <MapViewportController targetOffice={targetOffice} viewAll={viewAll} />
        {OFFICES.map((office) => (
          <OfficeMarker
            key={office.id}
            office={office}
            isSelected={viewAll || selectedRegionId === office.id}
            isOpen={!viewAll && openInfoId === office.id}
            bookLabel={t.clientsTeam.book}
            onSelect={() => {
              setViewAll(false);
              onSelectRegion(office.id);
              setOpenInfoId(office.id);
            }}
            onClose={() => setOpenInfoId(null)}
            onBook={() => onBookInRegion(office.id)}
          />
        ))}
      </GoogleMap>

      <MapLoadingSkeleton
        overlay
        visible={!tilesLoaded}
        variant="loading"
        title={t.footer.mapLoadingTitle}
        subtitle={mapSubtitle}
        openMapsUrl={externalMapsUrl}
        openMapsLabel={t.footer.openInMaps}
        retryLabel={t.footer.mapRetry}
      />

      {/* Clean Non-Overlapping Corner Floating Controls */}
      <a
        href={externalMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/95 hover:bg-[#132C40] text-[#132C40] hover:text-white border border-slate-200 shadow-sm text-xs font-semibold transition-colors"
      >
        <span>{t.footer.openInMaps}</span>
        <ExternalLink className="w-3 h-3 shrink-0" />
      </a>

      <div className="hidden sm:flex absolute bottom-3 left-3 z-10 items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 border border-slate-200 shadow-sm text-xs font-semibold text-[#132C40]">
        <MapPin className="w-3.5 h-3.5 text-[#1D72B8] shrink-0" aria-hidden="true" />
        <span>{viewAll ? t.footer.allHubs : getRegionLabel(activeOffice)}</span>
      </div>
    </div>
  );
};

function sanitizeMapsApiKey(raw: unknown): string {
  if (typeof raw !== 'string') return '';
  const trimmed = raw.trim();
  if (
    !trimmed ||
    trimmed.startsWith('MY_') ||
    trimmed.startsWith('YOUR_') ||
    trimmed.length < 20
  ) {
    return '';
  }
  return trimmed;
}

export const GlobalOfficesMap: React.FC<GlobalOfficesMapProps> = ({
  selectedRegionId,
  focusTrigger = 0,
  onSelectRegion,
  onBookInRegion,
}) => {
  const initialEnvKey = sanitizeMapsApiKey(
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  );
  const [apiKey, setApiKey] = useState<string>(initialEnvKey);
  const [keyChecked, setKeyChecked] = useState<boolean>(Boolean(initialEnvKey));
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [openInfoId, setOpenInfoId] = useState<RegionId | null>(selectedRegionId);
  const { t, language } = useLanguage();
  const [initialLanguage] = useState(language);

  useEffect(() => {
    setViewAll(false);
    setOpenInfoId(selectedRegionId);
  }, [selectedRegionId, focusTrigger]);

  useEffect(() => {
    const onFallbackError = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', onFallbackError);
    window.addEventListener('gmp-auth-error', onFallbackError);
    return () => {
      window.removeEventListener('gmp-quota-exceeded', onFallbackError);
      window.removeEventListener('gmp-auth-error', onFallbackError);
    };
  }, []);

  useEffect(() => {
    if (apiKey) {
      setKeyChecked(true);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 1200);

    fetch('/api/maps-config', { signal: controller.signal })
      .then((r) => {
        const contentType = r.headers.get('content-type') || '';
        if (!r.ok || !contentType.includes('application/json')) {
          return null;
        }
        return r.json();
      })
      .then((data) => {
        const cleanKey = sanitizeMapsApiKey(data?.apiKey);
        if (cleanKey) {
          setApiKey(cleanKey);
        }
      })
      .catch(() => {})
      .finally(() => {
        window.clearTimeout(timeoutId);
        setKeyChecked(true);
      });

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [apiKey]);

  const activeOffice =
    OFFICES.find((o) => o.id === selectedRegionId) || OFFICES[0];

  const getRegionLabel = (office: OfficeLocation) =>
    office.id === 'germany'
      ? t.regions.germany
      : office.id === 'dubai'
        ? t.regions.dubai
        : t.regions.london;

  const externalMapsUrl = `https://www.google.com/maps/search/?api=1&query=${activeOffice.lat},${activeOffice.lng}`;

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#102336] shadow-md flex flex-col h-full">
      {apiKey ? (
        <APIProvider apiKey={apiKey} libraries={['marker']} language={initialLanguage}>
          <InnerMapCanvas
            selectedRegionId={selectedRegionId}
            viewAll={viewAll}
            openInfoId={openInfoId}
            quotaExceeded={quotaExceeded}
            setViewAll={setViewAll}
            setOpenInfoId={setOpenInfoId}
            onSelectRegion={onSelectRegion}
            onBookInRegion={onBookInRegion}
          />
        </APIProvider>
      ) : keyChecked ? (
        <InteractiveLeafletHubMap
          selectedRegionId={selectedRegionId}
          viewAll={viewAll}
          openInfoId={openInfoId}
          onSelectHub={(id) => {
            setViewAll(false);
            onSelectRegion(id);
            setOpenInfoId(id);
          }}
          onCloseInfo={(closedId) =>
            setOpenInfoId((prev) => (prev === closedId ? null : prev))
          }
          onBookHub={onBookInRegion}
          openMapsLabel={t.footer.openInMaps}
          allHubsLabel={t.footer.allHubs}
          activeRegionLabel={getRegionLabel(activeOffice)}
          bookLabel={t.clientsTeam.book}
          loadingTitle={t.footer.mapLoadingTitle}
          unavailableTitle={t.footer.mapUnavailableTitle}
          retryLabel={t.footer.mapRetry}
        />
      ) : (
        <MapLoadingSkeleton
          variant="loading"
          title={t.footer.mapLoadingTitle}
          subtitle="London · Munich · Dubai"
          openMapsUrl={externalMapsUrl}
          openMapsLabel={t.footer.openInMaps}
          retryLabel={t.footer.mapRetry}
        />
      )}

      {/* Clean Localized Pin Focus Bar */}
      <div className="px-3.5 py-2.5 bg-slate-50 dark:bg-[#0B1724] border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          {t.footer.pinFocus}
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          {OFFICES.map((office) => {
            const active = !viewAll && selectedRegionId === office.id;
            return (
              <button
                key={office.id}
                type="button"
                onClick={() => {
                  setViewAll(false);
                  onSelectRegion(office.id);
                  setOpenInfoId(office.id);
                }}
                className={`px-3 py-1.5 text-[11px] font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-[#132C40] dark:bg-[#1D72B8] text-white'
                    : 'bg-white dark:bg-[#132C40] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#1D72B8]/50'
                }`}
              >
                {getRegionLabel(office)}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => {
              setViewAll(true);
              setOpenInfoId(null);
            }}
            className={`px-3 py-1.5 text-[11px] font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              viewAll
                ? 'bg-[#D49A4A] text-[#0E2233]'
                : 'bg-white dark:bg-[#132C40] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#D49A4A]/60'
            }`}
          >
            {t.footer.allHubs}
          </button>
        </div>
      </div>
    </div>
  );
};
