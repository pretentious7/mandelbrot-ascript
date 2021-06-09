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
		this.real = this.real*cplx.real - this.imag*cplx.imag;
        this.imag = this.imag*cplx.real + this.real*cplx.imag;
        return this;
		//return new Complex(real_part, imag_part);
	}

	toString(): string {
		return `r:${this.real},i:${this.imag}`;
	}

}

const ITER_CONST = 100; 

function mandelbrot(cplx: Complex):i8{
  let z: Complex = new Complex(0,0);
  
  let in_set: i8 = 0;
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

export const points_array = new Int8Array(X_LEN*Y_LEN);
const step_X = 4.0/X_LEN;
const step_Y = 4.0/Y_LEN;
for (let x = -2.0, count_x = 0; count_x < X_LEN; x += step_X, count_x++){
  for (let y = -2.0, count_y = DIV_CLASS; count_y < Y_LEN; y += step_Y, count_y+=N_THREADS){
    points_array[count_x*Y_LEN + count_y] = mandelbrot(new Complex(x,y)); 
  }
}