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
    initial: 80,
    maximum: 80,
    shared: true
});
//https://mandelbrot.ophir.dev/#{"pos":{"x":-0.743904874255535,"y":-0.1317119067802009

let arrayptr = 0;
const N_THREADS = 8;
const workers = new Array(N_THREADS);
for (let i = 0; i < N_THREADS; i++) {
    workers[i] = new Worker("wasm_worker.js");
}
console.log(workers)

let curWindow = 4;
let x_left = -2;
let y_bot = 2;
const ITER_CONST = 1000;

WebAssembly.compileStreaming(
    fetch('./build/mandel_final.wasm')).
    then(mod => {
        canvas.addEventListener('mousedown', (e) => {
            console.log(curWindow * (e.offsetX / canvas.width))
            console.log(e.offsetX, e.offsetY)
            //console.log(x_left + curWindow*(e.offsetX/canvas.width), y_top - curWindow*(e.offsetY/canvas.height))
            if (!e.shiftKey) {
                computeAndDrawMandel(x_left + curWindow * (e.offsetX / canvas.width), y_bot + curWindow * (e.offsetY / canvas.height), curWindow *= 0.8, mod)
                //ctx.scale(2, 2);
                //const newimg = new Image(canvas)
                //const scaleimgdata = ctx.getImageData(0,0,canvas.width/2,canvas.height/2)
                //newimg.src = scaleimgdata.toDataURL()
                ctx.drawImage(canvas, e.offsetX - 0.4 * canvas.width, e.offsetY - 0.4 * canvas.width, 0.8 * canvas.width, 0.8 * canvas.height, 0, 0, 1000, 1000)
                console.log('nani')
            } else {
                ctx.drawImage(canvas, e.offsetX - 0.6 * canvas.width, e.offsetY - 0.6 * canvas.width, 1.2 * canvas.width, 1.2 * canvas.height, 0, 0, 1000, 1000)
                computeAndDrawMandel(x_left + curWindow * (e.offsetX / canvas.width), y_bot + curWindow * (e.offsetY / canvas.height), curWindow *= 1.2, mod)
            }
        });
        computeAndDrawMandel(0., 0, curWindow, mod)

    }).catch(err => console.error)

function computeAndDrawMandel(XCENTER, YCENTER, WINDOW, mod) {
    let donecount = 0;
    const startTime = performance.now()
    for (let i = 0; i < N_THREADS; i++) {
        console.log(i)
        //const worker = new Worker("wasm_worker.js")
        workers[i].postMessage({
            n_worker: i,
            n_threads: N_THREADS,
            memory: memory,
            width: canvas.width,
            height: canvas.height,
            ITER_CONST,
            START_X_TOTAL: XCENTER - WINDOW / 2,
            START_Y_TOTAL: YCENTER - WINDOW / 2,
            WINDOW: WINDOW,
            mod
        })
        workers[i].onmessage = e => {
            donecount++
            if (donecount == N_THREADS) {
                //get these outtta here lol
                x_left = XCENTER - WINDOW / 2
                y_bot = YCENTER - WINDOW / 2

                document.getElementById('timing-val').innerText = performance.now() - startTime;

                draw(0)
            }
        }
    }
}



//ctx.putImageData(c,100,100)


function draw(arrayptr) {
    const arr_start = arrayptr
    console.log(arrayptr)
    const arr_end = arr_start + WIDTH * HEIGHT * 4
    const tempmem = new Int32Array(memory.buffer)
    console.log(tempmem)
    const imageArrayMemory = tempmem.slice(arr_start, arr_end);

    const arr = new Uint8ClampedArray(WIDTH * HEIGHT * 4);
    //const arr = new Uint8ClampedArray(imageArrayMemory)
    arr.fill(0)
    console.log(imageArrayMemory);


    imageArrayMemory.forEach(
        (val, i) => {
            val = 3 * 255 * (val / ITER_CONST);
            arr[4 * i + 3] = 255;
            //val -= 255;

            for (let j = 2; j >= 0; j--) {
                arr[4 * i + j] = (val % 256) * 1.2;
                val -= 255
                if (val <= 0) break;
            }

        });

    let imageData = new ImageData(arr, WIDTH, HEIGHT);
    //console.log(imageData);
    //ctx.putImageData(imageData,100,100);
    ctx.putImageData(imageData, 1, 1);
}