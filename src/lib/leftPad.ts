export default function leftPad(val: string) {
	return val.length < 2 ? '0' + val : val;
}
