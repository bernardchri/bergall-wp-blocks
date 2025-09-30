import { useBlockProps } from '@wordpress/block-editor';
import './style.scss';

export default function save( { attributes } ) {
	const blockProps = useBlockProps.save( {
		style: {
			position: attributes.fixed ? 'fixed' : undefined,
			zIndex: 1000,
		},
	} );

	return (
		<header { ...blockProps }>
			<div className="header-minimalist__barre">
				<div className="header-minimalist__logo">
					<a href="/">
						{ attributes.logo?.url && (
							<img src={ attributes.logo.url } alt="Site Logo" />
						) }
					</a>
				</div>
				<div className="header-minimalist__menu01" data-display="true">
					<ul
						className="menu"
						dangerouslySetInnerHTML={ {
							__html: attributes.menuPrimaireHtml,
						} }
					/>
				</div>
				<div
					className="header-minimalist__button ButtonMenu"
					data-open="false"
					aria-haspopup="false"
					aria-controls="menu"
				>
					<span className="entry-content">menu</span>
					<div className="ButtonMenu__icon">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
			</div>

			<div
				className="header-minimalist__menuburger"
				data-open="false"
				role="menu"
			>
				<div className="header-minimalist__menuburgerwrapper">
					<div className="header-minimalist__menu01">
						<ul
							dangerouslySetInnerHTML={ {
								__html: attributes.menuPrimaireHtml,
							} }
						/>
					</div>
					<div className="header-minimalist__menu02">
						<ul
							dangerouslySetInnerHTML={ {
								__html: attributes.menuSecondaireHtml,
							} }
						/>
					</div>
					<div className="header-minimalist__menu03">
						<ul
							dangerouslySetInnerHTML={ {
								__html: attributes.menuTertiaireHtml,
							} }
						/>
					</div>
				</div>
			</div>
		</header>
	);
}
