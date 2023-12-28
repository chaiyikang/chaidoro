import { getColorWithoutOpacity } from "../../main/helpers";

function getDocumentColour() {
	const element = document?.querySelector?.(".pomodoroDiv");
	const toastBgColor = element
		? getColorWithoutOpacity(getComputedStyle(element)?.backgroundColor)
		: "#1e293b";

	const toastFontColor = element
		? getComputedStyle(element)?.getPropertyValue?.("color")
		: "#94a3b8";
	return { toastBgColor, toastFontColor };
}

export default getDocumentColour;
