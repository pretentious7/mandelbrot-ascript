
declare const canvas_width: i32;
declare const canvas_height: i32;
declare const ITER_CONST: i32;
declare const DIV_CLASS: u8;
declare const N_THREADS: u8;
declare const START_X_TOTAL:f32
declare const START_Y_TOTAL:f32
declare const WINDOW:f32


//const ITER_CONST:i32 = 1000;

@inline
function mandelbrot(c_r:f64, c_i:f64):i8{
  let in_set: i8 = 0;
  let z_r:f64 = 0., z_i:f64 = 0., t_r:f64 = 0., t_i:f64 = 0.;
  for(let count = 0; z_r*z_r + z_i*z_i < 4; count++) {
    t_r = z_r*z_r - z_i*z_i + c_r;
    t_i = 2*z_i*z_r + c_i;
    z_r = t_r;
    z_i = t_i;
    if(count > ITER_CONST) {
      in_set = 1;
      break;
    }
  }
  return in_set;
}

@inline
function mandelbrot_simd(c_rl:v128,c_il:v128):v128{
    let in_set : v128 = i32x4(0,0,0,0);
    let z_r : v128 = f32x4(0.,0.,0.,0.);
    let z_i : v128 = f32x4(0.,0.,0.,0.);
    let t_r : v128 = f32x4(0.,0.,0.,0.);
    let t_i : v128 = f32x4(0.,0.,0.,0.);
    //const zeros = i32x4(0,0,0,0)
    const ones = i32x4(1,1,1,1)
    const fours = f32x4(4.,4.,4.,4.)
    //const twos = f32x4(2.,2.,2.,2.)
    //const ITER_CONSTS:v128 = i32x4(ITER_CONST,ITER_CONST,ITER_CONST,ITER_CONST)
    const ITER_CONSTS:v128 = v128.splat<i32>(ITER_CONST);
    /*for(let count=i32x4(0,0,0,0);
    v128.all_true(v128.le<f32>(v128.mul<f32>(z_r,z_r) + v128.mul<f32>(z_i,z_i),fours));
    count = v128.add<i32>(count,ones)){*/
    let count:v128=i32x4(0,0,0,0)
    for(
        let total_count:i32 = 0, any_in_convergence_region:boolean = true;
        any_in_convergence_region &&
        total_count < ITER_CONST;
        total_count++
    ) {
        z_i = v128.add<f32>(c_il, v128.mul<f32>(v128.add<f32>(z_r,z_r),z_i))
        z_r = v128.add<f32>(c_rl, v128.sub<f32>(t_r,t_i))
        t_r = v128.mul<f32>(z_r,z_r)
        t_i = v128.mul<f32>(z_i,z_i)
        const mask = v128.le<f32>(v128.add<f32>(t_r,t_i),fours)
        any_in_convergence_region = v128.any_true(mask)
        count = v128.add<i32>(count, v128.and(ones,mask))
    }
    /* {
        t_r = v128.add<f32>(v128.sub<f32>(v128.mul<f32>(z_r,z_r),v128.mul<f32>(z_i,z_i)),c_rl);
        z_i = v128.add<f32>(v128.mul<f32>(v128.mul<f32>(z_i,z_r), twos),c_il);
        z_r = t_r;
        //z_i = t_i;
        const mask = v128.le<f32>(v128.add<f32>(v128.mul<f32>(z_r,z_r),v128.mul<f32>(z_i,z_i)),fours)
        any_in_convergence_region = v128.any_true(mask)
        count = v128.add<i32>(count, v128.and(ones,mask))
    }*/
    return count;
}

    /*
    while(
    v128.all_true<i32>(v128.le<f32>(v128.add<f32>(v128.mul<f32>(z_r,z_r),v128.mul<f32>(z_i,z_i)),fours)) &&
    v128.all_true<i32>(v128.gt<i32>(ITER_CONSTS,count))
    ){
        t_r = v128.add<f32>(v128.sub<f32>(v128.mul<f32>(z_r,z_r),v128.mul<f32>(z_i,z_i)),c_rl);
        t_i = v128.add<f32>(v128.mul<f32>(v128.mul<f32>(z_i,z_r), f32x4(2.,2.,2.,2.)),c_il);
        z_r = t_r;
        z_i = t_i;
        const mask = v128.le<f32>(v128.add<f32>(v128.mul<f32>(z_r,z_r),v128.mul<f32>(z_i,z_i)),fours)
        count = v128.add<i32>(count,mask)
    }
    */
/*
    return i32x4(1,1,1,1);
}
*/


//mandelbrot_simd(f32x4(0.1,0.3,0.2,0.1),f32x4(0.1,0.3,0.2,0.1))
//(-0.761574,-0.0847596
//-1.62917,-0.0203968
/*
const START_X_TOTAL:f32 = -2.0
const START_Y_TOTAL:f32 =  -2.0
const WINDOW:f32 = 4.
*/
const step_X:f32= WINDOW/f32(canvas_width);
const step_Y:f32 = WINDOW/f32(canvas_height);
const segment:i32 = canvas_height/N_THREADS;
const start_yc:i32 = DIV_CLASS * (segment);
const start_y = START_Y_TOTAL + f32(start_yc) * step_Y;
const start_x:f32 = START_X_TOTAL;
const end_yc:i32 = start_yc + segment;
let a1 = f32x4(0,0,0,0);
let a2 = f32x4(0,0,0,0);
let memcounter = start_yc * canvas_width * 4;

//for (let x = -2.0, count_x = 0; count_x < canvas_width; x += step_X, count_x++){
for (let y:f32 = start_y, count_y =start_yc; count_y < end_yc; y += step_Y, count_y ++) {
    a1 = v128.splat<f32>(y);
    for(let x:f32 = start_x, count_x = 0; count_x < canvas_width; x+=4*step_X, count_x+=4){ 
        a2 = v128.replace_lane<f32>(v128.replace_lane<f32>(v128.replace_lane<f32>(v128.replace_lane<f32>(a2,3,x+3*step_X),2,x+2*step_X),1,x+step_X),0,x);
        v128.store((memcounter), mandelbrot_simd(a2,a1))
        memcounter+=16
    }
}


/*for ( let x:f32 = start_x, count_x = start_xc; count_x < end_xc; x += step_X, count_x++){
    a1 = v128.splat<f32>(x);
  for (let y:f32 = start_y, count_y = 0; count_y < canvas_height; y += 4*step_Y, count_y+=4){
      */
    //store<boolean>(count_x*canvas_height + count_y, mandelbrot(x,y));
    
    /*
    a2 = v128.replace_lane<f32>(a2,0,y);
    a2 = v128.replace_lane<f32>(a2,1,y+step_Y);
    a2 = v128.replace_lane<f32>(a2,2,y+2*step_Y);
    a2 = v128.replace_lane<f32>(a2,3,y+3*step_Y);
    */
    
    
    //a2 = v128.replace_lane<f32>(v128.replace_lane<f32>(v128.replace_lane<f32>(v128.replace_lane<f32>(a2,3,y+3*step_Y),2,y+2*step_Y),1,y+step_Y),0,y);

    //v128.store
    //v128.store(4*(count_x*canvas_height + count_y), mandelbrot_simd(a1,a2))
    //v128.store((memcounter+=16), mandelbrot_simd(a1,a2))
    //memcounter+=16

    //v128.store(count_x*canvas_height + count_y, a2)

  //}

//}


//v128.store(0,v128.ge<i8>(v128.splat<i8>(121),v128.splat<i8>(120)))

