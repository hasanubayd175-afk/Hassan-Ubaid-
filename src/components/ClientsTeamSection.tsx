import React, { useState } from 'react';
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  Compass,
  HardHat,
  MapPin,
  ShieldCheck,
  Wrench,
  Zap,
} from 'lucide-react';
import { CLIENT_CASES, IMAGES, TEAM_MEMBERS } from '../data/kelvisData';
import { useLanguage } from '../i18n/LanguageContext';
import { RegionId, TeamMember } from '../types/kelvis';
import { ResilientImage } from './ResilientImage';

interface ClientsTeamSectionProps {
  onBookRegion: (regionId: RegionId) => void;
}

const ROLE_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  t1: Compass,
  t2: Wrench,
  t3: Zap,
  t4: HardHat,
  t5: ShieldCheck,
};

export const ClientsTeamSection: React.FC<ClientsTeamSectionProps> = ({
  onBookRegion,
}) => {
  const [activeTab, setActiveTab] = useState<'team' | 'clients'>('team');
  const { t } = useLanguage();

  const mapHubToRegion = (hub: string): RegionId => {
    const lower = hub.toLowerCase();
    if (lower.includes('germany') || lower.includes('munich') || lower.includes('frankfurt')) {
      return 'germany';
    }
    if (lower.includes('dubai')) return 'dubai';
    return 'london';
  };

  const getRegionDisplay = (hub: string): string => {
    const id = mapHubToRegion(hub);
    if (id === 'germany') return `${t.regions.germany} · Munich`;
    if (id === 'dubai') return t.regions.dubaiFull;
    return t.regions.londonFull;
  };

  const featuredLeads = TEAM_MEMBERS.slice(0, 2);
  const specialistHeads = TEAM_MEMBERS.slice(2);

  const renderLeadCard = (member: TeamMember) => {
    const RoleIcon = ROLE_ICON_MAP[member.id] || Award;
    const regionId = mapHubToRegion(member.hub);

    return (
      <article
        key={member.id}
        className="group rounded-2xl bg-white dark:bg-[#102336] border border-slate-200 dark:border-slate-800 hover:border-[#1D72B8]/50 dark:hover:border-[#2E96D8]/50 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col sm:flex-row items-stretch"
      >
        <div className="relative sm:w-52 md:w-56 aspect-[4/3] sm:aspect-auto shrink-0 bg-[#0E2233] overflow-hidden">
          <ResilientImage
            src={member.photo}
            alt={`${member.name} — ${member.role}`}
            className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#0E2233]/75 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-[#0E2233]/15"
          />
          <span
            title={member.credential}
            className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0E2233]/85 backdrop-blur-sm border border-[#D49A4A]/50 text-[11px] font-mono font-semibold text-[#D49A4A]"
          >
            <BadgeCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span dir="ltr">{member.credential}</span>
          </span>
        </div>

        <div className="p-6 flex-1 flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#1D72B8] dark:text-[#2E96D8] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{getRegionDisplay(member.hub)}</span>
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#132C40] dark:text-white tracking-tight mt-0.5">
                  {member.name}
                </h3>
                <p className="text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-300 mt-0.5">
                  {member.role}
                </p>
              </div>

              <span
                title={member.specialty}
                aria-hidden="true"
                className="w-9 h-9 rounded-xl bg-[#F6F9FC] dark:bg-[#0B1724] border border-slate-200 dark:border-slate-700 text-[#1D72B8] dark:text-[#D49A4A] flex items-center justify-center shrink-0"
              >
                <RoleIcon className="w-4 h-4" />
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {member.bio}
            </p>

            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 pt-1 text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-[#132C40] dark:text-[#D49A4A]">
                {member.specialty}
              </span>
              {member.skills.map((skill) => (
                <React.Fragment key={skill}>
                  <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">
                    ·
                  </span>
                  <span>{skill}</span>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3.5 border-t border-slate-100 dark:border-slate-800">
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400">
              <Award className="w-3.5 h-3.5 text-[#D49A4A]" aria-hidden="true" />
              <span>{member.hub}</span>
            </span>
            <button
              type="button"
              onClick={() => onBookRegion(regionId)}
              className="px-4 py-2 rounded-lg bg-[#132C40] dark:bg-[#1D72B8] hover:bg-[#1D72B8] dark:hover:bg-[#D49A4A] text-white dark:hover:text-[#0E2233] text-sm font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>{t.clientsTeam.book}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </article>
    );
  };

  const renderSpecialistCard = (member: TeamMember) => {
    const RoleIcon = ROLE_ICON_MAP[member.id] || Award;
    const regionId = mapHubToRegion(member.hub);

    return (
      <article
        key={member.id}
        className="group rounded-2xl bg-white dark:bg-[#102336] border border-slate-200 dark:border-slate-800 hover:border-[#1D72B8]/50 dark:hover:border-[#2E96D8]/50 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between"
      >
        <div>
          <div className="relative aspect-[4/3] bg-[#0E2233] overflow-hidden">
            <ResilientImage
              src={member.photo}
              alt={`${member.name} — ${member.role}`}
              className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#0E2233]/80 via-[#0E2233]/10 to-transparent"
            />
            <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between gap-2">
              <span
                dir="ltr"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0E2233]/85 backdrop-blur-sm border border-[#D49A4A]/50 text-[11px] font-mono font-semibold text-[#D49A4A]"
              >
                <BadgeCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{member.credential}</span>
              </span>
              <span
                title={member.specialty}
                aria-hidden="true"
                className="w-8 h-8 rounded-lg bg-[#0E2233]/85 backdrop-blur-sm border border-white/15 text-white flex items-center justify-center shrink-0"
              >
                <RoleIcon className="w-4 h-4 text-[#D49A4A]" />
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-2.5">
            <p className="text-sm font-medium text-[#1D72B8] dark:text-[#2E96D8] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{getRegionDisplay(member.hub)}</span>
            </p>
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#132C40] dark:text-white tracking-tight">
                {member.name}
              </h3>
              <p className="text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-300 mt-0.5">
                {member.role}
              </p>
            </div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {member.bio}
            </p>
            <p className="pt-1 text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 leading-relaxed">
              <span className="font-semibold text-[#132C40] dark:text-slate-200">
                {member.specialty}
              </span>
              {' · '}
              {member.skills.join(' · ')}
            </p>
          </div>
        </div>

        <div className="px-5 sm:px-6 pb-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {member.hub}
          </span>
          <button
            type="button"
            onClick={() => onBookRegion(regionId)}
            className="px-3.5 py-2 rounded-lg bg-[#F6F9FC] dark:bg-[#0B1724] hover:bg-[#132C40] dark:hover:bg-[#1D72B8] text-[#132C40] dark:text-slate-100 hover:text-white border border-slate-200 dark:border-slate-700 text-sm font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>{t.clientsTeam.book}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </article>
    );
  };

  return (
    <section
      id="company"
      className="py-14 md:py-20 bg-[#EBF1F8] dark:bg-[#07111C] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-px bg-[#D49A4A]" aria-hidden="true" />
              <p className="text-sm font-semibold tracking-wider uppercase text-[#1D72B8] dark:text-[#2E96D8]">
                {t.regions.london} · {t.regions.germany} · {t.regions.dubai}
              </p>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#132C40] dark:text-white">
              {activeTab === 'clients'
                ? t.clientsTeam.clientsHeading
                : t.clientsTeam.teamHeading}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-1.5">
              {activeTab === 'clients'
                ? t.clientsTeam.clientsSub
                : t.clientsTeam.teamSub}
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Team and Clients tabs"
            className="inline-flex items-center gap-1 p-1 bg-white/90 dark:bg-[#102336] border border-slate-200 dark:border-slate-800 rounded-xl self-start sm:self-auto shadow-xs"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'team'}
              onClick={() => setActiveTab('team')}
              className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap min-h-[38px] cursor-pointer ${
                activeTab === 'team'
                  ? 'bg-[#132C40] dark:bg-[#1D72B8] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#132C40] dark:hover:text-white'
              }`}
            >
              {t.clientsTeam.teamTab}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'clients'}
              onClick={() => setActiveTab('clients')}
              className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap min-h-[38px] cursor-pointer ${
                activeTab === 'clients'
                  ? 'bg-[#132C40] dark:bg-[#1D72B8] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#132C40] dark:hover:text-white'
              }`}
            >
              {t.clientsTeam.clientsTab}
            </button>
          </div>
        </div>

        {activeTab === 'team' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredLeads.map(renderLeadCard)}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {specialistHeads.map(renderSpecialistCard)}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-neutral-900 border border-transparent dark:border-slate-800 min-h-[260px] lg:min-h-[360px]">
              <ResilientImage
                src={IMAGES.teamHubs}
                alt="Kelvix Solutions regional client portfolios"
                className="w-full h-full object-cover lg:h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-display text-lg font-semibold text-white">
                  {t.regions.london} · {t.regions.germany} · {t.regions.dubai}
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {CLIENT_CASES.map((client) => (
                <article
                  key={client.id}
                  className="p-5 rounded-2xl bg-white dark:bg-[#102336] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    {client.logo && (
                      <div
                        className={`w-12 h-12 rounded-full overflow-hidden shrink-0 flex items-center justify-center ring-1 ring-[#D49A4A]/45 shadow-xs ${
                          client.id.startsWith('tesco')
                            ? 'bg-white'
                            : client.id.startsWith('morrisons')
                              ? 'bg-[#0B4619]'
                              : 'bg-[#FFF000]'
                        }`}
                      >
                        <img
                          src={client.logo}
                          alt={`${client.name} logo`}
                          loading="lazy"
                          className={client.logoScaleClass || 'w-full h-full object-cover'}
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5 truncate">
                        {client.city} · {client.sector}
                      </p>
                      <h3 className="font-display text-base font-bold text-[#132C40] dark:text-white truncate">
                        {client.name}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                    <span className="font-mono text-xs font-semibold text-[#2E96D8] tabular-nums">
                      {client.metric}
                    </span>
                    <span className="text-xs text-slate-400 truncate max-w-[140px]">
                      {client.servicesUsed.slice(0, 2).join(' · ')}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
