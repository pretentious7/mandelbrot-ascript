const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
/*
WebAssembly
	.instantiateStreaming( fetch('./build/mandelbrot.wasm'),{
		env: {
            abort: () => console.log("Abort!")
        },
        mandelbrot: {
            canvas_width: canvas.width,
            canvas_height: canvas.height
        }
	})
	.then(results => {
		var memory = new Uint8Array(
			results.instance.exports.memory.buffer);

		var arrayptr = results.instance.exports.points_array.value;

		console.log(arrayptr);
		console.log(memory[arrayptr+28])
		const arr_start = arrayptr + 32
		const arr_end = arr_start + WIDTH*HEIGHT
		const imageArrayMemory = memory.slice(arr_start,arr_end);
		const arr = new Uint8ClampedArray(WIDTH*HEIGHT*4);
		console.log(imageArrayMemory);
		arr.fill(0);
		imageArrayMemory.forEach(
			(val, i) => {
				if(val) { 
					arr[4*i + 0] = 55; arr[4*i + 1] = 0; arr[4*i + 2] = 50; arr[4*i + 3] = 100;
				}
			});

		let imageData = new ImageData(arr,WIDTH,HEIGHT);
		console.log(imageData);
		//ctx.putImageData(imageData,100,100);
		ctx.putImageData(imageData,1,1);


		//console.log(imageArray.reduce((acc, cur) => acc + cur, 0));
		//console.log(imageArray.some((val) => val == 1));
		//setTimeout(() => console.log(memory),1000)
    });
*/

const memory = new WebAssembly.Memory({
  initial: 20,
  maximum: 50,
  shared: true
});

let arrayptr = 0;
const N_THREADS = 2;
let donecount = 0;
for (let i =0; i<N_THREADS; i++) {
    console.log(i)
    const worker = new Worker("wasm_worker.js")
    worker.postMessage({
        n_worker: i,
        n_threads: N_THREADS,
        memory: memory,
        width: canvas.width,
        height: canvas.height
    })
    worker.onmessage = e => {
        donecount++
        if(donecount == N_THREADS) {
            draw(0)
        }
    }
}

function draw(arrayptr) {
    const arr_start = arrayptr
    console.log(arrayptr)
    const arr_end = arr_start + WIDTH * HEIGHT
    const tempmem = new Uint8Array(memory.buffer)
    console.log(tempmem)
    const imageArrayMemory = tempmem.slice(arr_start, arr_end);
    const arr = new Uint8ClampedArray(WIDTH * HEIGHT * 4);
    console.log(imageArrayMemory);
    arr.fill(0);
    imageArrayMemory.forEach(
        (val, i) => {
            if (val) {
                arr[4 * i + 0] = 55; arr[4 * i + 1] = 0; arr[4 * i + 2] = 50; arr[4 * i + 3] = 100;
            }
        });

    let imageData = new ImageData(arr, WIDTH, HEIGHT);
    console.log(imageData);
    //ctx.putImageData(imageData,100,100);
    ctx.putImageData(imageData, 1, 1);
}