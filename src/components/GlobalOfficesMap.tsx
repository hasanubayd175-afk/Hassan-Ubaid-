import React, { useEffect, useState } from 'react';
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
import { ExternalLink, MapPin } from 'lucide-react';
import { OFFICES } from '../data/kelvisData';
import { useLanguage } from '../i18n/LanguageContext';
import { OfficeLocation, RegionId } from '../types/kelvis';

interface GlobalOfficesMapProps {
  selectedRegionId: RegionId;
  focusTrigger?: number;
  onSelectRegion: (regionId: RegionId) => void;
  onBookInRegion: (regionId: RegionId) => void;
}

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

const FallbackHubCanvas: React.FC<{
  activeOffice: OfficeLocation;
  viewAll: boolean;
  onSelectHub: (id: RegionId) => void;
  onBookHub: (id: RegionId) => void;
  openMapsLabel: string;
  bookLabel: string;
}> = ({
  activeOffice,
  viewAll,
  onSelectHub,
  onBookHub,
  openMapsLabel,
  bookLabel,
}) => {
  const externalMapsUrl = `https://www.google.com/maps/search/?api=1&query=${activeOffice.lat},${activeOffice.lng}`;

  return (
    <div className="flex-1 min-h-[380px] sm:min-h-[420px] w-full flex flex-col justify-between bg-[#0B1926] text-slate-200 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#D49A4A]">
          <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{viewAll ? 'London · Germany · Dubai' : activeOffice.city}</span>
        </div>
        <a
          href={externalMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#1D72B8] text-white text-xs font-semibold transition-colors"
        >
          <span>{openMapsLabel}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
        {OFFICES.map((office) => {
          const isCurrent = !viewAll && office.id === activeOffice.id;
          return (
            <div
              key={office.id}
              onClick={() => onSelectHub(office.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectHub(office.id);
                }
              }}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                isCurrent
                  ? 'bg-[#132C40] border-[#D49A4A]/70 shadow-lg'
                  : 'bg-[#102336]/75 border-white/10 hover:border-[#2E96D8]/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-mono text-[11px] font-bold text-[#D49A4A]">
                    {office.hubCode}
                  </span>
                  <span dir="ltr" className="font-mono text-[10px] text-slate-400 tabular-nums">
                    {office.lat.toFixed(2)}°, {office.lng.toFixed(2)}°
                  </span>
                </div>
                <p className="font-display text-sm font-bold text-white">
                  {office.city}
                </p>
                <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                  {office.addressLine1}
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onBookHub(office.id);
                }}
                className="w-full py-1.5 rounded-lg bg-white/10 hover:bg-[#D49A4A] text-white hover:text-[#0E2233] text-[11px] font-semibold transition-colors cursor-pointer"
              >
                {bookLabel}
              </button>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-slate-400">
        {activeOffice.addressLine2} · {activeOffice.timezone}
      </p>
    </div>
  );
};

const InnerMapCanvas: React.FC<{
  selectedRegionId: RegionId;
  viewAll: boolean;
  openInfoId: RegionId | null;
  quotaExceeded: boolean;
  setViewAll: (v: boolean) => void;
  setOpenInfoId: (id: RegionId | null) => void;
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

  if (
    quotaExceeded ||
    status === APILoadingStatus.FAILED ||
    status === APILoadingStatus.AUTH_FAILURE
  ) {
    return (
      <FallbackHubCanvas
        activeOffice={activeOffice}
        viewAll={viewAll}
        onSelectHub={(id) => {
          setViewAll(false);
          onSelectRegion(id);
          setOpenInfoId(id);
        }}
        onBookHub={onBookInRegion}
        openMapsLabel={t.footer.openInMaps}
        bookLabel={t.clientsTeam.book}
      />
    );
  }

  return (
    <div className="flex-1 min-h-[380px] sm:min-h-[420px] w-full relative">
      <GoogleMap
        mapId="DEMO_MAP_ID"
        defaultCenter={{ lat: activeOffice.lat, lng: activeOffice.lng }}
        defaultZoom={12}
        gestureHandling="cooperative"
        mapTypeControl={false}
        streetViewControl={false}
        fullscreenControl={true}
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
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

export const GlobalOfficesMap: React.FC<GlobalOfficesMapProps> = ({
  selectedRegionId,
  focusTrigger = 0,
  onSelectRegion,
  onBookInRegion,
}) => {
  const [apiKey, setApiKey] = useState<string>(
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  );
  const [keyChecked, setKeyChecked] = useState<boolean>(
    Boolean(import.meta.env.VITE_GOOGLE_MAPS_API_KEY)
  );
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [openInfoId, setOpenInfoId] = useState<RegionId | null>(selectedRegionId);
  const { t } = useLanguage();

  useEffect(() => {
    setViewAll(false);
    setOpenInfoId(selectedRegionId);
  }, [selectedRegionId, focusTrigger]);

  useEffect(() => {
    const onQuotaError = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', onQuotaError);
    return () => window.removeEventListener('gmp-quota-exceeded', onQuotaError);
  }, []);

  useEffect(() => {
    if (apiKey) {
      setKeyChecked(true);
      return;
    }
    fetch('/api/maps-config')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.apiKey) setApiKey(data.apiKey);
      })
      .catch(() => {})
      .finally(() => setKeyChecked(true));
  }, [apiKey]);

  const activeOffice =
    OFFICES.find((o) => o.id === selectedRegionId) || OFFICES[0];

  const getRegionLabel = (office: OfficeLocation) =>
    office.id === 'germany'
      ? t.regions.germany
      : office.id === 'dubai'
        ? t.regions.dubai
        : t.regions.london;

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#102336] shadow-md flex flex-col h-full">
      {apiKey ? (
        <APIProvider apiKey={apiKey} libraries={['marker']}>
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
        <FallbackHubCanvas
          activeOffice={activeOffice}
          viewAll={viewAll}
          onSelectHub={(id) => {
            setViewAll(false);
            onSelectRegion(id);
            setOpenInfoId(id);
          }}
          onBookHub={onBookInRegion}
          openMapsLabel={t.footer.openInMaps}
          bookLabel={t.clientsTeam.book}
        />
      ) : (
        <div className="flex-1 min-h-[380px] sm:min-h-[420px] w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0B1724] text-slate-600 dark:text-slate-300 px-6 text-center">
          <p className="font-display text-sm font-semibold text-[#132C40] dark:text-white mb-1">
            Loading Global Hub Map...
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            London (51.51°N) · Munich (48.14°N) · Dubai (25.20°N)
          </p>
        </div>
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
