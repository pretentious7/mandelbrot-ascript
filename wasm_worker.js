


onmessage = ({data}) => {
    const {n_worker, n_threads, memory, width, height} = data;
    WebAssembly.instantiateStreaming( 
    fetch('./build/mandelbrot_worker.wasm'), {
		env: {
            abort: () => console.log("Abort!"),
            memory: memory
        },
        mandelbrot_worker: {
            canvas_width: width,
            canvas_height: height,
            DIV_CLASS: n_worker,
            N_THREADS: n_threads
        }
    }).then(results => {
        results.instance.exports.run_thread(n_worker);
                
        postMessage("done")
        //setInterval(()=>postMessage("done"),10000);
    })
}