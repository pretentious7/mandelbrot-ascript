


onmessage = ({data}) => {
    const {n_worker, n_threads, memory, width, height} = data;
    WebAssembly.instantiateStreaming( 
    fetch('./build/mandel_final.wasm'), {
		env: {
            abort: () => console.log("Abort!"),
            memory: memory,
            log: (message) => console.log(message)
        },
        mandel_final: {
            canvas_width: width,
            canvas_height: height,
            DIV_CLASS: n_worker,
            N_THREADS: n_threads
        }
    }).then(results => {
        //results.instance.exports.run_thread(n_worker);
                
        postMessage("done")
        //setInterval(()=>postMessage("done"),10000);
    })
}