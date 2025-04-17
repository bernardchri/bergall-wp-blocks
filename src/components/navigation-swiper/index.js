import './style.css';


export function SliderNavigation(paginationDisplay, navigationDisplay) {
    return (
        // 
        <div className="slidernav slidernav-bottom">
            {paginationDisplay && <div className="swiper-pagination"></div>}
            {navigationDisplay && <div className="navigation">
                <div className="button-prev">←</div>
                <div className="button-next">→</div>
            </div>}
        </div>
    );
}