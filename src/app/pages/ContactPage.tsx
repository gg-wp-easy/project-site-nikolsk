import { motion } from "motion/react";
import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import { useTranslation } from "react-i18next";

type FaqItem = {
  q: string;
  a: string;
};

export function ContactPage() {
  const { t } = useTranslation();
  const phones = [
    {
      label: t('contact.phoneLabels.sales'),
      display: "+7 937 418 18 18",
      digits: "79374181818",
    },
    {
      label: t('contact.phoneLabels.production'),
      display: "+7 927 288 61 91",
      digits: "79272886191",
    },
    {
      label: t('contact.phoneLabels.delivery'),
      display: "+7 927 364 36 87",
      digits: "79273643687",
    },
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: t('contact.cards.phone'),
      phones,
    },
    {
      icon: Mail,
      title: t('contact.cards.email'),
      details: ["traidservis58@internet.ru"],
    },
  ];

  const faqListRaw = t('faq', { returnObjects: true });
  const faqList = Array.isArray(faqListRaw) ? (faqListRaw as FaqItem[]) : [];
  const companyAddress = t('contact.details.address.0');
  const yandexMapSrc = `https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(
    companyAddress
  )}&z=16`;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-14 sm:py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 overflow-hidden gradient-animate">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%,transparent_100%)] bg-[length:50px_50px]" />
        </div>
        <div className="floating-orb h-48 w-48 bg-cyan-300/25 top-8 left-6" />
        <div className="floating-orb floating-orb-delay floating-orb-slow h-60 w-60 bg-blue-300/25 -bottom-20 right-4" />
        <div className="relative z-10 mx-auto max-w-[24rem] min-w-0 px-4 text-center sm:max-w-7xl sm:px-6 lg:px-8">
          <motion.h1
            className="page-hero-title mb-4 sm:mb-6"
          >
            {t('contact.hero.title')}
          </motion.h1>
          <motion.p
            className="page-hero-subtitle"
          >
            {t('contact.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 sm:py-16 bg-transparent">
        <div className="mx-auto max-w-[24rem] min-w-0 px-4 sm:max-w-5xl sm:px-6 lg:px-8">
          <div className="grid min-w-0 items-start gap-5 md:grid-cols-2">
            {contactInfo.map((info) => (
              <motion.div
                key={info.title}
                whileHover={{ y: -5 }}
                className="surface-card surface-card-hover min-w-0 overflow-hidden p-5 sm:p-6"
              >
                <div className="mb-5 flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.06, rotate: 3 }}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-600 to-cyan-500"
                  >
                    <info.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-950">
                    {info.title}
                  </h3>
                </div>
                <div className="space-y-3">
                  {"phones" in info && info.phones ? (
                    info.phones.map((phone) => (
                      <div
                        key={phone.digits}
                        className="min-w-0 rounded-lg border border-slate-200 bg-slate-50/80 p-3"
                      >
                        {"label" in phone && phone.label ? (
                          <div className="mb-2 text-xs font-bold uppercase text-slate-500">
                            {phone.label}
                          </div>
                        ) : null}
                        <div className="flex flex-col gap-3">
                          <a
                            href={`tel:+${phone.digits}`}
                            className="inline-flex min-w-0 items-center gap-2 break-words text-base font-semibold text-slate-950 transition-colors hover:text-sky-700"
                          >
                            <Phone className="h-4 w-4 text-sky-600" />
                            {phone.display}
                          </a>
                          <div className="flex flex-wrap gap-2">
                            <a
                              href={`https://t.me/+${phone.digits}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 rounded-lg border border-sky-200 bg-white px-3 py-2 text-sm font-semibold text-sky-700 transition-colors hover:border-sky-400 hover:bg-sky-50"
                            >
                              <Send className="h-4 w-4" />
                              {t('contact.messengers.telegram')}
                            </a>
                            <a
                              href={`https://wa.me/${phone.digits}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm font-semibold text-emerald-700 transition-colors hover:border-emerald-400 hover:bg-emerald-50"
                            >
                              <MessageCircle className="h-4 w-4" />
                              {t('contact.messengers.whatsapp')}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    info.details?.map((detail, i) => (
                      <a
                        key={i}
                        href={`mailto:${detail}`}
                        className="inline-flex min-w-0 items-center gap-2 break-all rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2 text-base font-semibold text-slate-950 transition-colors hover:border-sky-300 hover:text-sky-700"
                      >
                        <Mail className="h-4 w-4 text-sky-600" />
                        {detail}
                      </a>
                    ))
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Yandex Map */}
      <section className="pb-10 sm:pb-12 bg-transparent">
        <div className="mx-auto max-w-[24rem] px-4 sm:max-w-5xl sm:px-6 lg:px-8">
          <motion.div
            className="surface-card p-5 sm:p-6"
          >
            <h2 className="text-2xl font-bold text-slate-950 mb-3">
              {t('map.title')}
            </h2>
            <p className="mb-4 text-sm leading-6 text-slate-600">{companyAddress}</p>
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <iframe
                title={`${t('map.title')} - ${companyAddress}`}
                src={yandexMapSrc}
                width="100%"
                height="340"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full sm:h-[420px]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-14 sm:py-20 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {t('contact.faqTitle')}
            </h2>
            <p className="section-lead">
              {t('contact.faqSubtitle')}
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqList.map((faq, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className="surface-card surface-card-hover p-5 sm:p-6"
              >
                <h3 className="text-lg font-bold text-slate-950 mb-2">
                  {faq.q}
                </h3>
                <p className="text-sm leading-7 text-slate-600 sm:text-base">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
