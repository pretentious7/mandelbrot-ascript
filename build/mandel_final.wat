(module
 (type $none_=>_none (func))
 (import "env" "memory" (memory $0 (shared 80 80)))
 (import "mandel_final" "WINDOW" (global $assembly/mandel_final/WINDOW f32))
 (import "mandel_final" "canvas_width" (global $assembly/mandel_final/canvas_width i32))
 (import "mandel_final" "canvas_height" (global $assembly/mandel_final/canvas_height i32))
 (import "mandel_final" "N_THREADS" (global $assembly/mandel_final/N_THREADS i32))
 (import "mandel_final" "DIV_CLASS" (global $assembly/mandel_final/DIV_CLASS i32))
 (import "mandel_final" "START_Y_TOTAL" (global $assembly/mandel_final/START_Y_TOTAL f32))
 (import "mandel_final" "START_X_TOTAL" (global $assembly/mandel_final/START_X_TOTAL f32))
 (import "mandel_final" "ITER_CONST" (global $assembly/mandel_final/ITER_CONST i32))
 (global $assembly/mandel_final/step_X (mut f32) (f32.const 0))
 (global $assembly/mandel_final/step_Y (mut f32) (f32.const 0))
 (global $assembly/mandel_final/segment (mut i32) (i32.const 0))
 (global $assembly/mandel_final/start_yc (mut i32) (i32.const 0))
 (global $assembly/mandel_final/start_y (mut f32) (f32.const 0))
 (global $assembly/mandel_final/end_yc (mut i32) (i32.const 0))
 (global $assembly/mandel_final/a1 (mut v128) (v128.const i32x4 0x00000000 0x00000000 0x00000000 0x00000000))
 (global $assembly/mandel_final/a2 (mut v128) (v128.const i32x4 0x00000000 0x00000000 0x00000000 0x00000000))
 (global $assembly/mandel_final/memcounter (mut i32) (i32.const 0))
 (start $~start)
 (func $start:assembly/mandel_final
  (local $0 f32)
  (local $1 v128)
  (local $2 v128)
  (local $3 f32)
  (local $4 i32)
  (local $5 i32)
  (local $6 v128)
  (local $7 i32)
  (local $8 v128)
  (local $9 v128)
  (local $10 i32)
  (local $11 f32)
  (local $12 v128)
  (local $13 v128)
  (local $14 v128)
  (local $15 v128)
  (local $16 v128)
  global.get $assembly/mandel_final/WINDOW
  global.get $assembly/mandel_final/canvas_width
  f32.convert_i32_s
  f32.div
  global.set $assembly/mandel_final/step_X
  global.get $assembly/mandel_final/WINDOW
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
  global.set $assembly/mandel_final/start_yc
  global.get $assembly/mandel_final/START_Y_TOTAL
  global.get $assembly/mandel_final/start_yc
  f32.convert_i32_s
  global.get $assembly/mandel_final/step_Y
  f32.mul
  f32.add
  global.set $assembly/mandel_final/start_y
  global.get $assembly/mandel_final/start_yc
  global.get $assembly/mandel_final/segment
  i32.add
  global.set $assembly/mandel_final/end_yc
  global.get $assembly/mandel_final/start_yc
  global.get $assembly/mandel_final/canvas_width
  i32.mul
  i32.const 2
  i32.shl
  global.set $assembly/mandel_final/memcounter
  global.get $assembly/mandel_final/start_y
  local.set $3
  global.get $assembly/mandel_final/start_yc
  local.set $4
  loop $for-loop|0
   local.get $4
   global.get $assembly/mandel_final/end_yc
   i32.lt_s
   if
    local.get $3
    f32x4.splat
    global.set $assembly/mandel_final/a1
    global.get $assembly/mandel_final/START_X_TOTAL
    local.set $0
    i32.const 0
    local.set $5
    loop $for-loop|1
     local.get $5
     global.get $assembly/mandel_final/canvas_width
     i32.lt_s
     if
      global.get $assembly/mandel_final/a2
      local.get $0
      global.get $assembly/mandel_final/step_X
      f32.const 3
      f32.mul
      f32.add
      f32x4.replace_lane 3
      local.get $0
      global.get $assembly/mandel_final/step_X
      local.tee $11
      local.get $11
      f32.add
      f32.add
      f32x4.replace_lane 2
      local.get $0
      global.get $assembly/mandel_final/step_X
      f32.add
      f32x4.replace_lane 1
      local.get $0
      f32x4.replace_lane 0
      global.set $assembly/mandel_final/a2
      global.get $assembly/mandel_final/a2
      local.set $12
      global.get $assembly/mandel_final/a1
      local.set $13
      v128.const i32x4 0x00000000 0x00000000 0x00000000 0x00000000
      local.set $1
      v128.const i32x4 0x00000000 0x00000000 0x00000000 0x00000000
      local.set $2
      v128.const i32x4 0x00000000 0x00000000 0x00000000 0x00000000
      local.set $8
      v128.const i32x4 0x00000000 0x00000000 0x00000000 0x00000000
      local.set $9
      v128.const i32x4 0x00000001 0x00000001 0x00000001 0x00000001
      local.set $14
      v128.const i32x4 0x40800000 0x40800000 0x40800000 0x40800000
      local.set $15
      v128.const i32x4 0x00000000 0x00000000 0x00000000 0x00000000
      local.set $6
      i32.const 0
      local.set $7
      i32.const 1
      local.set $10
      loop $for-loop|3
       local.get $7
       global.get $assembly/mandel_final/ITER_CONST
       i32.lt_s
       i32.const 0
       local.get $10
       select
       if
        local.get $13
        local.get $1
        local.get $1
        f32x4.add
        local.get $2
        f32x4.mul
        f32x4.add
        local.set $2
        local.get $12
        local.get $8
        local.get $9
        f32x4.sub
        f32x4.add
        local.tee $1
        local.get $1
        f32x4.mul
        local.tee $8
        local.get $2
        local.get $2
        f32x4.mul
        local.tee $9
        f32x4.add
        local.get $15
        f32x4.le
        local.tee $16
        v128.any_true
        local.set $10
        local.get $6
        local.get $14
        local.get $16
        v128.and
        i32x4.add
        local.set $6
        local.get $7
        i32.const 1
        i32.add
        local.set $7
        br $for-loop|3
       end
      end
      global.get $assembly/mandel_final/memcounter
      local.get $6
      v128.store
      global.get $assembly/mandel_final/memcounter
      i32.const 16
      i32.add
      global.set $assembly/mandel_final/memcounter
      local.get $0
      global.get $assembly/mandel_final/step_X
      f32.const 4
      f32.mul
      f32.add
      local.set $0
      local.get $5
      i32.const 4
      i32.add
      local.set $5
      br $for-loop|1
     end
    end
    local.get $3
    global.get $assembly/mandel_final/step_Y
    f32.add
    local.set $3
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $for-loop|0
   end
  end
 )
 (func $~start
  call $start:assembly/mandel_final
 )
)
