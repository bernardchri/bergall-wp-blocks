import './style.scss';

export default function NavigationSwiper( {
	paginationDisplay,
	navigationDisplay,
} ) {
	return (
		<div className="slidernav">
			{ paginationDisplay && (
				<div
					className="pagination"
					role="group"
					aria-label="Slider pagination"
				></div>
			) }

			{ navigationDisplay && (
				<nav className="navigation" aria-label="Slider navigation">
					<button
						type="button"
						className="button-prev arrow-button"
						aria-label="Previous slide"
						aria-controls="slider"
					>
						<div className="anima-arrow-wrapper anima-arrow-left">
							<span className="anima-arrow">←</span>
							<span className="anima-arrow">←</span>
						</div>
					</button>

					<button
						type="button"
						className="button-next arrow-button"
						aria-label="Next slide"
						aria-controls="anima"
					>
						<div className="anima-arrow-wrapper anima-arrow-right">
							<span className="anima-arrow">→</span>
							<span className="anima-arrow">→</span>
						</div>
					</button>
				</nav>
			) }
		</div>
	);
}
