import { motion } from "motion/react";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ContactPage() {
  const { t } = useTranslation();

  const contactInfo = [
    /*{
      icon: MapPin,
      title: t('contact.cards.address'),
      details: t('contact.details.address', { returnObjects: true }) as string[],
    },*/
    {
      icon: Phone,
      title: t('contact.cards.phone'),
      phones: [
        {
          label: t('contact.phoneLabels.sales'),
          display: "+7 937 418 1818",
          digits: "79374181818",
        },
        {
          label: t('contact.phoneLabels.production'),
          display: "+7 927 288 6191",
          digits: "79272886191",
        },
      ],
    },
    {
      icon: Mail,
      title: t('contact.cards.email'),
      details: ["info@glasstech.ru"],
    },
    /*{
      icon: Clock,
      title: t('contact.cards.hours'),
      details: t('contact.details.hours', { returnObjects: true }) as string[],
    },*/
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const faqListRaw = t('faq', { returnObjects: true });
  const faqList = Array.isArray(faqListRaw) ? faqListRaw : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { name, email, message } = formData;

    // TODO: replace with your own email-sending service or backend endpoint.
    // Example using Formspree (https://formspree.io):
    //   1. create a form there and copy the form ID (f/xxxxxxx)
    //   2. replace the URL below with `https://formspree.io/f/yourId`
    //   3. you can also proxy through your own API at `/api/send-email`.
    try {
      const resp = await fetch('https://formsubmit.co/email', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (!resp.ok) {
        throw new Error('network error');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('submission error', err);
      // optionally show error to user
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%,transparent_100%)] bg-[length:50px_50px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            {t('contact.hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto"
          >
            {t('contact.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mb-4"
                >
                  <info.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {info.title}
                </h3>
                <div className="space-y-2">
                  {"phones" in info && info.phones ? (
                    info.phones.map((phone) => (
                      <div key={phone.digits} className="text-sm text-gray-600">
                        <div className="font-medium text-gray-900">{phone.label}</div>
                        <div className="flex flex-col gap-1">
                          <a
                            href={`tel:+${phone.digits}`}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            {phone.display}
                          </a>
                          <a
                            href={`https://t.me/+${phone.digits}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
                          >
                            <svg
                              aria-hidden="true"
                              viewBox="0 0 24 24"
                              className="w-4 h-4"
                              fill="currentColor"
                            >
                              <path d="M9.993 15.164 9.82 19.1c.43 0 .62-.183.85-.402l2.04-1.932 4.233 3.097c.778.429 1.332.204 1.525-.72l2.763-12.965c.236-1.1-.398-1.53-1.1-1.275L2.28 9.57c-1.063.418-1.048 1.018-.182 1.286l4.64 1.447 10.77-6.8c.506-.312.967-.14.587.198L9.993 15.164z" />
                            </svg>
                            {t('contact.messengers.telegram')}
                          </a>
                          <a
                            href={`https://wa.me/${phone.digits}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700"
                          >
                            <svg
                              aria-hidden="true"
                              viewBox="0 0 24 24"
                              className="w-4 h-4"
                              fill="currentColor"
                            >
                              <path d="M20.52 3.48A11.85 11.85 0 0 0 12.03 0C5.4 0 0 5.4 0 12.03c0 2.12.55 4.19 1.6 6.03L0 24l6.18-1.57a12.06 12.06 0 0 0 5.85 1.5h.01c6.63 0 12.03-5.4 12.03-12.03 0-3.22-1.25-6.25-3.55-8.42ZM12.03 21.5h-.01a9.5 9.5 0 0 1-4.84-1.33l-.35-.2-3.67.93.98-3.58-.22-.37a9.46 9.46 0 0 1-1.46-4.92c0-5.25 4.27-9.52 9.53-9.52a9.45 9.45 0 0 1 6.73 2.79 9.46 9.46 0 0 1 2.79 6.73c0 5.26-4.27 9.53-9.48 9.53Zm5.47-7.1c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.46-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.5l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5 0 1.47 1.08 2.89 1.23 3.09.15.2 2.13 3.26 5.15 4.57.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
                            </svg>
                            {t('contact.messengers.whatsapp')}
                          </a>
                        </div>
                      </div>
                    ))
                  ) : (
                    info.details?.map((detail, i) => (
                      <p key={i} className="text-gray-600 text-sm">
                        {detail}
                      </p>
                    ))
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      {/*<section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t('contact.form.title')}
              </h2>
              <p className="text-gray-600 mb-8">
                {t('contact.form.subtitle')}
              </p>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <p className="text-green-800">
                    {t('contact.form.thankyou')}
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder={t('contact.form.placeholders.name')}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.fields.email')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder={t('contact.form.placeholders.email')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.fields.company')}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder={t('contact.form.placeholders.company')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.fields.message')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                    placeholder={t('contact.form.placeholders.message')}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full py-4 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-lg"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      {t('contact.form.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t('contact.form.submit')}
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {t('contact.map.title')}
                </h2>

                <div className="relative h-96 bg-gray-200 rounded-xl overflow-hidden shadow-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                      <p className="text-gray-600 font-semibold">
                        {t('contact.details.address.0')}, {t('contact.details.address.1')}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        {t('contact.map.placeholder')}
                      </p>
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-400/20"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(34, 211, 238, 0.3) 0%, transparent 50%)",
                    }}
                  />
                </div>
              </div>*/}

              {/* Additional Info */}
              {/*<div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('contact.urgent.title')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('contact.urgent.description')}
                </p>
                <motion.a
                  href="tel:+74951234567"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold shadow-md"
                >
                  <Phone className="w-5 h-5" />
                  {t('contact.urgent.phone')}
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>*/}

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('contact.faqTitle')}
            </h2>
            <p className="text-gray-600">
              {t('contact.faqSubtitle')}
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqList.map((faq: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
