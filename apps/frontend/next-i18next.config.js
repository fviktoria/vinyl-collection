const locales = require('./public/locales/locales.json');

function getLocales(locales) {
	return locales.map(({ locale }) => locale);
}

module.exports = {
	i18n: {
		locales: [...getLocales(locales)],
		defaultLocale: 'en',
		localeDetection: false,
	},
	reloadOnPrerender: process.env.NODE_ENV === 'development',
};
