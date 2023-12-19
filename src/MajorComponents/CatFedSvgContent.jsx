import CatFed0SvgContent from "./CatFed0SvgContent";
import CatFed1SvgContent from "./CatFed1SvgContent";
import CatFed2SvgContent from "./CatFed2SvgContent";
import CatFed3SvgContent from "./CatFed3SvgContent";
import CatFed4SvgContent from "./CatFed4SvgContent";

function CatFedSvgContent({ fedState }) {
	if (fedState === 0) return <CatFed0SvgContent />;
	if (fedState === 1) return <CatFed1SvgContent />;
	if (fedState === 2) return <CatFed2SvgContent />;
	if (fedState === 3) return <CatFed3SvgContent />;
	if (fedState >= 4) return <CatFed4SvgContent />;
	return <CatFed0SvgContent />;
}

export default CatFedSvgContent;
