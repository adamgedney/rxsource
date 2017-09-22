import { expect } from 'chai';
import {singleSrcModule, SingleSrc} from 'Src/index.js';// Src is a reference from in webpack to the src folder


// list
describe('init', () => {
	it('should pass', () => {
		expect(true).to.equal(true);
	});
});