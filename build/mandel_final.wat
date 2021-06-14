(module
 (type $none_=>_none (func))
 (import "env" "memory" (memory $0 (shared 80 100)))
 (import "mandel_final" "canvas_width" (global $assembly/mandel_final/canvas_width i32))
 (import "mandel_final" "canvas_height" (global $assembly/mandel_final/canvas_height i32))
 (import "mandel_final" "N_THREADS" (global $assembly/mandel_final/N_THREADS i32))
 (import "mandel_final" "DIV_CLASS" (global $assembly/mandel_final/DIV_CLASS i32))
 (global $assembly/mandel_final/step_X (mut f32) (f32.const 0))
 (global $assembly/mandel_final/step_Y (mut f32) (f32.const 0))
 (global $assembly/mandel_final/segment (mut i32) (i32.const 0))
 (global $assembly/mandel_final/start_xc (mut i32) (i32.const 0))
 (global $assembly/mandel_final/start_x (mut f32) (f32.const 0))
 (global $assembly/mandel_final/end_xc (mut i32) (i32.const 0))
 (global $assembly/mandel_final/a1 (mut v128) (v128.const i32x4 0x00000000 0x00000000 0x00000000 0x00000000))
 (global $assembly/mandel_final/a2 (mut v128) (v128.const i32x4 0x00000000 0x00000000 0x00000000 0x00000000))
 (global $assembly/mandel_final/memcounter (mut i32) (i32.const 0))
 (start $~start)
 (func $start:assembly/mandel_final
  (local $0 v128)
  (local $1 v128)
  (local $2 v128)
  (local $3 v128)
  (local $4 v128)
  (local $5 v128)
  (local $6 v128)
  (local $7 i32)
  (local $8 i32)
  (local $9 v128)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 f32)
  (local $14 v128)
  (local $15 f32)
  f32.const 1.0000000474974513e-03
  global.get $assembly/mandel_final/canvas_width
  f32.convert_i32_s
  f32.div
  global.set $assembly/mandel_final/step_X
  f32.const 1.0000000474974513e-03
  global.get $assembly/mandel_final/canvas_height
  f32.convert_i32_s
  f32.div
  global.set $assembly/mandel_final/step_Y
  global.get $assembly/mandel_final/canvas_height
  global.get $assembly/mandel_final/N_THREADS
  i32.div_s
  global.set $assembly/mandel_final/segment
  global.get $assembly/mandel_final/DIV_CLASS
  global.get $assembly/mandel_final/segment
  i32.mul
  global.set $assembly/mandel_final/start_xc
  global.get $assembly/mandel_final/start_xc
  f32.convert_i32_s
  global.get $assembly/mandel_final/step_X
  f32.mul
  f32.const -0.10100000351667404
  f32.add
  global.set $assembly/mandel_final/start_x
  global.get $assembly/mandel_final/start_xc
  global.get $assembly/mandel_final/segment
  i32.add
  global.set $assembly/mandel_final/end_xc
  global.get $assembly/mandel_final/start_xc
  global.get $assembly/mandel_final/canvas_height
  i32.mul
  i32.const 2
  i32.shl
  global.set $assembly/mandel_final/memcounter
  global.get $assembly/mandel_final/start_x
  local.set $13
  global.get $assembly/mandel_final/start_xc
  local.set $12
  loop $for-loop|0
   local.get $12
   global.get $assembly/mandel_final/end_xc
   i32.lt_s
   if
    local.get $13
    f32x4.splat
    global.set $assembly/mandel_final/a1
    f32.const 0.9559999704360962
    local.set $15
    i32.const 0
    local.set $11
    loop $for-loop|1
     local.get $11
     global.get $assembly/mandel_final/canvas_height
     i32.lt_s
     if
      global.get $assembly/mandel_final/a2
      local.get $15
      f32x4.replace_lane 0
      global.set $assembly/mandel_final/a2
      global.get $assembly/mandel_final/a2
      local.get $15
      global.get $assembly/mandel_final/step_Y
      f32.add
      f32x4.replace_lane 1
      global.set $assembly/mandel_final/a2
      global.get $assembly/mandel_final/a2
      local.get $15
      global.get $assembly/mandel_final/step_Y
      global.get $assembly/mandel_final/step_Y
      f32.add
      f32.add
      f32x4.replace_lane 2
      global.set $assembly/mandel_final/a2
      global.get $assembly/mandel_final/a2
      local.get $15
      global.get $assembly/mandel_final/step_Y
      f32.const 3
      f32.mul
      f32.add
      f32x4.replace_lane 3
      global.set $assembly/mandel_final/a2
      global.get $assembly/mandel_final/memcounter
      i32.const 16
      i32.add
      global.set $assembly/mandel_final/memcounter
      global.get $assembly/mandel_final/memcounter
      global.get $assembly/mandel_final/a1
      local.set $6
      global.get $assembly/mandel_final/a2
      local.set $5
      i32.const 0
      i32x4.splat
      local.set $14
      i32.const 0
      i32x4.splat
      local.set $1
      i32.const 0
      local.set $10
      i32.const 0
      i32x4.splat
      local.set $9
      v128.const i32x4 0x00000001 0x00000001 0x00000001 0x00000001
      local.set $4
      v128.const i32x4 0x40800000 0x40800000 0x40800000 0x40800000
      local.set $3
      v128.const i32x4 0x40000000 0x40000000 0x40000000 0x40000000
      local.set $2
      i32.const 1
      local.set $8
      loop $for-loop|10
       local.get $10
       i32.const 1000
       i32.lt_s
       i32.const 0
       local.get $8
       select
       if
        local.get $1
        local.get $1
        f32x4.mul
        local.get $14
        local.get $14
        f32x4.mul
        f32x4.sub
        local.get $6
        f32x4.add
        local.get $14
        local.get $1
        f32x4.mul
        local.get $2
        f32x4.mul
        local.get $5
        f32x4.add
        local.set $14
        local.tee $1
        local.get $1
        f32x4.mul
        local.get $14
        local.get $14
        f32x4.mul
        f32x4.add
        local.get $3
        f32x4.le
        local.tee $0
        v128.any_true
        local.set $8
        local.get $9
        local.get $4
        local.get $0
        v128.and
        i32x4.add
        local.set $9
        local.get $10
        i32.const 1
        i32.add
        local.set $10
        br $for-loop|10
       end
      end
      local.get $9
      v128.store
      local.get $15
      global.get $assembly/mandel_final/step_Y
      f32.const 4
      f32.mul
      f32.add
      local.set $15
      local.get $11
      i32.const 4
      i32.add
      local.set $11
      br $for-loop|1
     end
    end
    local.get $13
    global.get $assembly/mandel_final/step_X
    f32.add
    local.set $13
    local.get $12
    i32.const 1
    i32.add
    local.set $12
    br $for-loop|0
   end
  end
 )
 (func $~start
  call $start:assembly/mandel_final
 )
)
