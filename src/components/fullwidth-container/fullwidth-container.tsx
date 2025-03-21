import { StyledFullwidthContainer } from './fullwidth-container.styles';

import type { FC, PropsWithChildren } from 'react';

/** full screen width inside a smaller container */
export const FullwidthContainer: FC<PropsWithChildren<object>> = ({ children }) => {
	return <StyledFullwidthContainer>{children}</StyledFullwidthContainer>;
};
