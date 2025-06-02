export const omikuji = [];
export const reasons =[];
export const targets = [];
export const actions = [];

function randomItem(arr){
	return arr[Math.floor(Math.random() * arr.length)];
}

export function generateOmikuji(){
	const p1 = randomItem(omikuji);
	const p2 = randomItem(reasons);
	const p3 = randomItem(targets);
	const p4 = randomItem(actions);

	return [p1,`${p2}、${p3}${p4}`];
}
