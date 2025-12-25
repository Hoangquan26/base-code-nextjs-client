import Image from "next/image";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative min-h-screen ">
            <div className=" grid grid-cols-1 xl:grid-cols-2 w-full h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
                {/* FORM */}
                <div className=" flex items-center justify-center min-h-screen">
                    {children}
                </div>

                {/* BANNER */}
                <div className=" hidden xl:block">
                    <div className="relative hidden w-full flex-1 lg:block bg-brand-blue overflow-hidden group h-full">
                        <input className="peer hidden" id="news-toggle" type="checkbox" />
                        <Image blurDataURL="data:image/jpeg;base64,..." loading="lazy" alt="" width={1280} height={720} className="absolute inset-0 h-full w-full object-cover opacity-90 transition-all duration-700 peer-checked:scale-105 peer-checked:blur-[4px]" data-alt="Modern glass office building interior with soft lighting and professional atmosphere" src="/img/company.jpg" />
                        {/* <div className=" absolute inset-0 bg-gradient-to-t from-brand-blue/95 via-brand-blue/50 to-primary/10 mix-blend-multiply transition-opacity duration-500 peer-checked:bg-brand-blue/95 peer-checked:opacity-100"></div> */}
                        {/* Text overlay for readability */}
                        <div className="
                            absolute inset-0 
                            bg-gradient-to-t 
                            from-black/70 via-black/30 to-transparent
                            pointer-events-none
                            transition-opacity duration-500
                            peer-checked:opacity-0
                            " />

                        <label className="absolute inset-0 p-16 flex flex-col justify-end h-full cursor-pointer transition-all duration-500 ease-in-out opacity-100 translate-y-0 peer-checked:opacity-0 peer-checked:translate-y-10 peer-checked:pointer-events-none group/quote" htmlFor="news-toggle">
                            <div className="max-w-2xl relative">
                                <div className="flex gap-2 mb-6">
                                    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white/20">v4.2 Released</span>
                                </div>
                                <blockquote className="text-3xl font-bold leading-tight text-white drop-shadow-sm mb-6">
                                    “CRM Vicenza triển khai PB 0.0.1”
                                </blockquote>
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="h-12 w-12 rounded-full bg-slate-200 overflow-hidden ring-2 ring-white">
                                        <Image alt="" width={58} height={58} className="h-full w-full object-cover" data-alt="Portrait of a professional business woman smiling" src="/img/team-img.jpg" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-base font-bold text-white">Phòng công nghệ</span>
                                        <span className="text-sm text-slate-300">@VicenzaTech 2025.</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 font-bold group-hover/quote:animate-none group-hover/quote:text-vicenza-400 text-vicenza-500 transition-colors">
                                    <span>Xem thêm bản tin mới nhất</span>
                                </div>
                            </div>
                        </label>
                        {/* <div className="absolute inset-0 flex flex-col h-full transition-all duration-500 ease-in-out opacity-0 -translate-y-10 pointer-events-none peer-checked:opacity-100 peer-checked:translate-y-0 peer-checked:pointer-events-auto bg-brand-blue/95 backdrop-blur-md lg:px-20 lg:py-16">
                            <div className="flex items-start justify-between mb-8 pb-6 border-b border-white/10">
                                <div>
                                    <h3 className="text-3xl font-bold text-white flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary text-4xl">feed</span>
                                        Company Bulletin
                                    </h3>
                                    <p className="text-slate-400 mt-2 text-sm ml-12 max-w-md">Stay updated with the latest features, system maintenance schedules, and company announcements.</p>
                                </div>
                                <label className="group/close cursor-pointer p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-105 active:scale-95 flex items-center justify-center" for="news-toggle">
                                    <span className="material-symbols-outlined text-slate-300 group-hover/close:text-white transition-colors">close</span>
                                </label>
                            </div>
                            <div className="flex-1 overflow-y-auto pr-4 space-y-6">
                                <article className="relative pl-8 border-l-2 border-primary hover:bg-white/5 p-4 rounded-r-xl transition-all cursor-pointer group/item">
                                    <div className="absolute left-[-9px] top-6 w-4 h-4 rounded-full bg-primary ring-4 ring-brand-blue group-hover/item:ring-primary/20 transition-all"></div>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue bg-primary px-2 py-0.5 rounded shadow-sm">New Feature</span>
                                            <span className="text-xs font-medium text-white">Today, 9:00 AM</span>
                                        </div>
                                        <span className="material-symbols-outlined text-primary opacity-0 group-hover/item:opacity-100 transition-opacity text-sm">arrow_forward</span>
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-2 group-hover/item:text-primary transition-colors">CRM Nexus 4.2: AI-Driven Insights</h4>
                                    <p className="text-sm text-slate-300 leading-relaxed mb-3">
                                        We've just deployed our new machine learning module that predicts deal closure probability with 85% accuracy. Start forecasting with confidence.
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="flex -space-x-2">
                                            <div className="w-6 h-6 rounded-full bg-slate-600 border border-brand-blue flex items-center justify-center text-[10px] text-white">JD</div>
                                            <div className="w-6 h-6 rounded-full bg-slate-500 border border-brand-blue flex items-center justify-center text-[10px] text-white">AK</div>
                                        </div>
                                        <span className="text-xs text-slate-500">Posted by Product Team</span>
                                    </div>
                                </article>
                                <article className="relative pl-8 border-l-2 border-slate-700 hover:border-slate-500 hover:bg-white/5 p-4 rounded-r-xl transition-all cursor-pointer group/item">
                                    <div className="absolute left-[-6px] top-6 w-2.5 h-2.5 rounded-full bg-brand-blue ring-2 ring-slate-500 group-hover/item:bg-slate-500 group-hover/item:ring-white transition-colors"></div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-slate-700 border border-slate-600 px-2 py-0.5 rounded">Security</span>
                                        <span className="text-xs text-slate-400">Yesterday</span>
                                    </div>
                                    <h4 className="text-lg font-bold text-white mb-2 group-hover/item:text-yellow-100 transition-colors">SOC2 Compliance Achievement</h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        Security is our top priority. We are proud to announce that CRM Nexus is now fully SOC2 Type II compliant, ensuring your data is safer than ever.
                                    </p>
                                </article>
                                <article className="relative pl-8 border-l-2 border-slate-700 hover:border-slate-500 hover:bg-white/5 p-4 rounded-r-xl transition-all cursor-pointer group/item">
                                    <div className="absolute left-[-6px] top-6 w-2.5 h-2.5 rounded-full bg-brand-blue ring-2 ring-slate-500 group-hover/item:bg-slate-500 group-hover/item:ring-white transition-colors"></div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-slate-700 border border-slate-600 px-2 py-0.5 rounded">Event</span>
                                        <span className="text-xs text-slate-400">2 days ago</span>
                                    </div>
                                    <h4 className="text-lg font-bold text-white mb-2 group-hover/item:text-yellow-100 transition-colors">Global Developer Conference</h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        Join over 5,000 developers for our annual virtual summit. Early bird tickets are available now for all premium users.
                                    </p>
                                </article>
                                <article className="relative pl-8 border-l-2 border-slate-700 hover:border-slate-500 hover:bg-white/5 p-4 rounded-r-xl transition-all cursor-pointer group/item">
                                    <div className="absolute left-[-6px] top-6 w-2.5 h-2.5 rounded-full bg-brand-blue ring-2 ring-slate-500 group-hover/item:bg-slate-500 group-hover/item:ring-white transition-colors"></div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-slate-700 border border-slate-600 px-2 py-0.5 rounded">Integration</span>
                                        <span className="text-xs text-slate-400">Last week</span>
                                    </div>
                                    <h4 className="text-lg font-bold text-white mb-2 group-hover/item:text-yellow-100 transition-colors">New Slack &amp; Teams Integration</h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        Seamlessly update your pipeline directly from your favorite communication tools without switching tabs.
                                    </p>
                                </article>
                                <article className="relative pl-8 border-l-2 border-slate-700 hover:border-slate-500 hover:bg-white/5 p-4 rounded-r-xl transition-all cursor-pointer group/item opacity-75">
                                    <div className="absolute left-[-6px] top-6 w-2.5 h-2.5 rounded-full bg-brand-blue ring-2 ring-slate-500 group-hover/item:bg-slate-500 group-hover/item:ring-white transition-colors"></div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-slate-700 border border-slate-600 px-2 py-0.5 rounded">System</span>
                                        <span className="text-xs text-slate-400">2 weeks ago</span>
                                    </div>
                                    <h4 className="text-lg font-bold text-white mb-2 group-hover/item:text-yellow-100 transition-colors">Scheduled Maintenance Complete</h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        The scheduled database optimization has been completed successfully. All systems are operational with 15% improved latency.
                                    </p>
                                </article>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
