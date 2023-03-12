import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

const init = () => {
	Sentry.init({
		dsn: 'https://af031519e9ed44cca9895bddb17659d2@o4504181861580800.ingest.sentry.io/4504826232242176',
		integrations: [new BrowserTracing()],
		tracesSampleRate: 1.0,
	});
};

const log = (error: any) => {
	Sentry.captureException(error);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	init,
	log,
};
