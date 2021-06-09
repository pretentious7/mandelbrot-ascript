declare const canvas_width: i32;
declare const canvas_height: i32;
declare const DIV_CLASS: u8;
declare const N_THREADS: u8;

class Complex {
	real: f64 = 0;
	imag: f64 = 0;
	constructor(real:f64, imag:f64){
		this.real = real;
		this.imag = imag;
    }

	add(cplx: Complex): Complex {
        this.real = this.real + cplx.real;
        this.imag = this.imag + cplx.imag;
        return this;
		//return new Complex(this.real + cplx.real, this.imag + cplx.imag);
	}

	mag(): f64 {
		//return Math.hypot(this.real,this.imag);
		return Math.sqrt(this.real * this.real + this.imag * this.imag)
	}

	mul(cplx: Complex): Complex {
		// (a + ib)*(c + id) = (ac - bd) + i(bc + ad)
		const real_part = this.real*cplx.real - this.imag*cplx.imag;
        const imag_part = this.imag*cplx.real + this.real*cplx.imag;
        this.real = real_part;
        this.imag = imag_part;
        return this;
		//return new Complex(real_part, imag_part);
	}

	toString(): string {
		return `r:${this.real},i:${this.imag}`;
    }

    set(real:f64,imag:f64): void {
        this.real = real;
        this.imag = imag;
    }

}

const ITER_CONST = 100;
let z = new Complex(0,0);
let cplx = new Complex(0,0);
let in_set: i8 = 0;

function mandelbrot(real:f64,imag:f64):i8{
  //let z: Complex = new Complex(0,0);
  z.set(0,0)
  cplx.set(real,imag)
  
  in_set = 0;
  for (let count = 0; z.mag() <= 2; count++) {
    z = (z.mul(z)).add(cplx); // z = z^2 + cplx
    if (count > ITER_CONST) {
      in_set = 1;
      break;
    }
  }
  return in_set;
}


const X_LEN:i32 = canvas_width;
const Y_LEN:i32 = canvas_height;

const step_X = 4.0/X_LEN;
const step_Y = 4.0/Y_LEN;
let index = 0;
let x:f64 = -2.0;
let count_x =0;
let y:f64 = -2.0;
let count_y = 0;
const segment = X_LEN/N_THREADS;
const start_xc = DIV_CLASS * (segment)
const start_x = -2.0 + start_xc * step_X
for ( x = start_x, count_x = start_xc; count_x < start_xc+segment; x += step_X, count_x++){
  for ( y = -2.0, count_y = 0; count_y < Y_LEN; y += step_Y, count_y++){
    //index = count_x*Y_LEN + count_y;
    atomic.store<i8>(count_x*Y_LEN + count_y, mandelbrot(x,y), 0);
    //points_array[count_x*Y_LEN + count_y] = mandelbrot(new Complex(x,y)); 
  }
}
