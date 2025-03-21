import type { FC, PropsWithChildren } from 'react';

export const Main: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return <main>{children}</main>;
};
