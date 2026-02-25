import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Target, Eye, Award, TrendingUp, Users, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";


export function AboutPage() {
  const { t } = useTranslation();

  const milestones = [
    { year: "2001", event: t('about.milestones.2001') },
    { year: "2008", event: t('about.milestones.2008') },
    { year: "2015", event: t('about.milestones.2015') },
    { year: "2020", event: t('about.milestones.2020') },
    { year: "2024", event: t('about.milestones.2024') },
    { year: "2026", event: t('about.milestones.2026') },
  ];

  const values = [
    {
      icon: Target,
      title: t('about.values.mission.title'),
      description: t('about.values.mission.description'),
    },
    {
      icon: Eye,
      title: t('about.values.vision.title'),
      description: t('about.values.vision.description'),
    },
    {
      icon: Award,
      title: t('about.values.values.title'),
      description: t('about.values.values.description'),
    },
  ];

  const stats = [
    {
      icon: TrendingUp,
      value: "500+",
      label: t('about.stats.completedProjects'),
    },
    {
      icon: Users,
      value: "50+",
      label: t('about.stats.specialists'),
    },
    {
      icon: Globe,
      value: "15",
      label: t('about.stats.countries'),
    },
    {
      icon: Award,
      value: "25+",
      label: t('about.stats.years'),
    },
  ];

  const team = [
    {
      name: "Александр Петров",
      position: t('about.team.petrov.position'),
      description: t('about.team.petrov.description'),
    },
    {
      name: "Елена Смирнова",
      position: t('about.team.smirnova.position'),
      description: t('about.team.smirnova.description'),
    },
    {
      name: "Михаил Иванов",
      position: t('about.team.ivanov.position'),
      description: t('about.team.ivanov.description'),
    },
    {
      name: "Ольга Соколова",
      position: t('about.team.sokolova.position'),
      description: t('about.team.sokolova.description'),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1610896813398-6e965b3cc1b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMG1hbnVmYWN0dXJpbmclMjBmYWN0b3J5fGVufDF8fHx8MTc3MTkwODY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt={t('about.hero.alt')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-cyan-900/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            {t('about.hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto"
          >
            {t('about.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {t('about.story.title')}
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                {t('about.story.p1')}
              </p>
              <p className="text-lg text-gray-600 mb-4">
                {t('about.story.p2')}
              </p>
              <p className="text-lg text-gray-600">
                {t('about.story.p3')}
              </p>
              <p className="text-lg text-gray-600">
                {t('about.story.p4')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1575305842946-0e807ce6f3fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMGN1dHRpbmclMjBwcmVjaXNpb24lMjB3b3JrfGVufDF8fHx8MTc3MTkwODY2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt={t('about.story.imageAlt')}
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl opacity-20"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('about.principles.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('about.principles.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-6"
                >
                  <value.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('about.timeline.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('about.timeline.subtitle')}
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-cyan-400 hidden md:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-gray-50 p-6 rounded-xl shadow-md inline-block"
                    >
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                        {milestone.year}
                      </div>
                      <div className="text-gray-700 text-lg">
                        {milestone.event}
                      </div>
                    </motion.div>
                  </div>

                  {/* Center dot */}
                  <motion.div
                    whileHover={{ scale: 1.5 }}
                    className="w-6 h-6 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-full border-4 border-white shadow-lg z-10 hidden md:block"
                  />

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center"
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('about.team.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('about.team.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center"
              >
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <div className="text-blue-600 font-semibold mb-3">
                  {member.position}
                </div>
                <p className="text-sm text-gray-600">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
