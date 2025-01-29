export default (opts = {}) => {
	// Add fluid function
	const fluid = (minSize, maxSize, minBreakpoint = 340, maxBreakpoint = 1536) => {
		// Convert vars to rem
		let minSizeRem = Math.round((minSize / 16) * 100) / 100;
		let maxSizeRem = Math.round((maxSize / 16) * 100) / 100;
		
		// Check if minSize is greater than maxSize
		const inverted = minSizeRem > maxSizeRem;

		let minWidth, maxWidth;
		if (inverted) {
			[minSizeRem, maxSizeRem] = [maxSizeRem, minSizeRem];
			maxWidth = Math.round((minBreakpoint / 16) * 100) / 100;
			minWidth = Math.round((maxBreakpoint / 16) * 100) / 100;
		} else {
			minWidth = Math.round((minBreakpoint / 16) * 100) / 100;
			maxWidth = Math.round((maxBreakpoint / 16) * 100) / 100;
		}

		// Calculate slope and Y-axis intersection
		const slope = (maxSizeRem - minSizeRem) / (maxWidth - minWidth);
		const yAxisInt = -1 * minWidth * slope + minSizeRem;

		// Define the preferred size for clamp function, rounded to 4 decimals
		const prefSize = `${yAxisInt.toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw`;

		// Return clamp function
		return `clamp(${minSizeRem.toFixed(4)}rem, ${prefSize}, ${maxSizeRem.toFixed(4)}rem)`;
	};

	return {
		postcssPlugin: 'postcss-fluid',
		Declaration(decl) {
			// Check if the declaration value contains 'fluid('
			if (decl.value.includes('fluid(')) {
				// Extract parameters and call fluid function
				const match = decl.value.match(/fluid\((.*?)\)/);
				if (match) {
					const params = match[1].split(',').map(param => parseFloat(param.trim()));
					decl.value = fluid(...params);
				}
			}
		}
	}
}

export const postcss = true