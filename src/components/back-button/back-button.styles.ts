import { css } from '@emotion/react';
import styled from '@emotion/styled';

type StyledBackButtonWrapperProps = {
	isScrolled: boolean;
};

export const StyledBackButtonWrapper = styled.div<StyledBackButtonWrapperProps>`
	${({ isScrolled }) =>
		isScrolled
			? css`
					position: fixed;
					top: 1rem;
					left: 1rem;
					z-index: 100;
					transition: top 0.3s ease-in-out;
					animation: slideIn 0.3s forwards;

					@keyframes slideIn {
						from {
							transform: translateY(-100%);
						}
						to {
							transform: translateY(0);
						}
					}
				`
			: css`
					animation: slideOut 0.3s forwards;

					@keyframes slideOut {
						from {
							transform: translateY(0);
						}
						to {
							transform: translateY(-100%);
						}
					}
				`}
`;
