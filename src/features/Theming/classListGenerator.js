// opacity.theme.type.pseudo
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
export const themes = [
	"slate",
	"gray",
	"zinc",
	"neutral",
	"stone",
	"red",
	"orange",
	"amber",
	"yellow",
	"lime",
	"green",
	"emerald",
	"teal",
	"cyan",
	"sky",
	"blue",
	"indigo",
	"violet",
	"purple",
	"fuchsia",
	"pink",
	"rose",
];
const types = ["text", "fill", "bg", "border"];
const pseudoClasses = ["hover", "active"];

const shadesObject = {};

shades.forEach(shade => {
	shadesObject[shade] = {};
	themes.forEach(theme => {
		shadesObject[shade][theme] = {};
		types.forEach(type => {
			if (type !== "bg" && type !== "text") {
				// Assign the string value directly for non-bg types
				shadesObject[shade][theme][type] = `${type}-${theme}-${shade}`;
			} else {
				// Create the object with active, hover, and none states for bg type
				shadesObject[shade][theme][type] = {
					active: `active:${type}-${theme}-${shade}`,
					hover: `hover:${type}-${theme}-${shade}`,
					before: `before:${type}-${theme}-${shade}`,
					after: `after:${type}-${theme}-${shade}`,
					none: `${type}-${theme}-${shade}`,
				};
			}
		});
	});
});

console.log(shadesObject);

export default shadesObject;
