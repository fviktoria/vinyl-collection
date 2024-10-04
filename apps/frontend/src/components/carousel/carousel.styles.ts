import styled from '@emotion/styled';

export const StyledCarouselContainer = styled.div`
	position: relative;

	.splide__track {
		overflow: visible;
	}
`;

export const StyledArrowsContainer = styled.div`
	.prev-button {
		position: absolute;
		top: 50%;
		left: -1rem;
		transform: translateY(-50%);
		z-index: 1;
	}

	.next-button {
		position: absolute;
		top: 50%;
		right: -1rem;
		transform: translateY(-50%);
		z-index: 1;
	}
`;
