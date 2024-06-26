import { Hono } from "hono";
import { ResObject } from "../types"

const basic = new Hono();

basic.get('/variable', (c) => {
    // ===== var =====
    var id = "I0001"
    /* 
        var ເປັນຕົວປ່ຽນທີ່ສາມາດປ່ຽນແປງຄ່າໄດ້ ແລະ ບໍ່ຈຳກັດຂອບເຂດ
        id = "I0002" (no error)
    */

    // ===== let =====
    let name = "John"
    /*
        let ແມ່ນຕົວປ່ຽນທີ່ສາມາດປ່ຽນແປງຄ່າໄດ້ ແລະ ຈຳກັດຂອບເຂດ
        name = 'Max' (no error)
    */

    // ===== const =====
    const phone = "55555555"
    /*
        const ແມ່ນຕົວປ່ຽນທີ່ບໍ່ສາມາດປ່ຽນແປງຄ່າໄດ້ ຫລື ບໍ່ສາມາດເອົາຄ່າໃຫມ່ໃສ່ໄດ້ ແລະ ຈຳກັດຂອບເຂດ
        phone = "22222222" (error)
    */

    // Variable Scope (ຂອບເຂດຂອງຕົວປ່ຽນ)
    function func1() {
        var v1 = "1"
        let v2 = "3"
        if (true) {
            var v1 = "2"
            let v2 = "4"
        }

        console.log("v1:", v1) // v1: 2 (ຄ່າຖືກປ່ຽນແປງ ຈາກ "1" ເປັນ "2")
        console.log("v2:", v2); // v2: 3 (ຄ່າບໍ່ຖືກປ່ຽນແປງ ຍັງເປັນ "3" ຄືເກົ່າ)
    }

    func1()

    let res: ResObject = {
        code: 10,
        message: 'Basic JavaScript/TypeScript Variable'
    }
    return c.json(res);
})

basic.get('/datatype', (c) => {
    let fullname = "John Doe" // string
    let salary = 100000.00 // number
    let maried = false // boolean
    let activity = ['Sport', 'Music', 'Fitness'] // array
    let address = { village: '', district: '', province: '' } // object

    // TypeScript
    let v1: string = ""
    let v2: number = 0
    let v3: boolean = false
    let v4: []
    let v5: {}

    let res: ResObject = {
        code: 10,
        message: 'Basic JavaScript/TypeScript Data Type'
    }
    return c.json(res);
})

basic.get('/condition', (c) => {
    let v1 = 1
    let v2 = 2

    if (v1 + v2 === 3) {
        console.log('v1 + v2 = 3', true);
    } else if (v1 < v2) {
        console.log('v1 < v2', true);
    } else {
        console.log('Others');
    }

    let v3 = 5
    switch (v3) {
        case 1:
            console.log('*switch v3 = 1', true);
            break;
        case 2:
            console.log('*switch v3 = 2', true);
            break;
        case 5:
            console.log('*switch v3 = 5', true);
            break;
        default:
            console.log('*switch no matching case');
            break;
    }

    let res: ResObject = {
        code: 10,
        message: 'Basic JavaScript/TypeScript Condition'
    }
    return c.json(res);
})

basic.get('/loop', (c) => {
    let data = [1, 2, 3, 4, 5]

    // for loop
    for (let i = 0; i < data.length; i++) {
        console.log('for loop:', i, data[i]);
    }

    // for of loop (ເອົາສະເພາະຄ່າ [value] ທີ່ຢູ່ໃນ data)
    for (let o of data) {
        console.log('for of loop:', o);
    }

    // for in loop (ເອົາສະເພາະຄີຍ໌ [key] ທີ່ຢູ່ໃນ data)
    for (let i in data) {
        console.log('for in loop:', i, data[i]);
    }

    // for each loop (ເປັນ method ຂອງ array)
    data.forEach((o) => {
        console.log('for each loop:', o);
    })

    // while loop (loop ຕາມເງື່ອນໄຂ)
    let wi = 0
    while (data.length > wi) {
        console.log('while loop:', data[wi]);
        wi = wi + 1;
    }

    // do while loop (loop ຕາມເງື່ອນໄຂ ແຕ່ຈະມີເຫດການເກີດກ່ອນທີ່ຈະເຂົ້າເງື່ອນໄຂ)
    let dwi = 0
    do {
        console.log('do while loop:', data[dwi]);
        dwi++
    } while (data.length > dwi) {
        console.log('end of do while loop');
    }

    let res: ResObject = {
        code: 10,
        message: 'Basic JavaScript/TypeScript Looping'
    }
    return c.json(res);
})

basic.get('/string', (c) => {
    let str = "Basic JavaScript/TypeScript"

    console.log('str', str);

    // string methods
    console.log('split at index=0:', str.split(' ')[0]);
    console.log('split at index=1:', str.split(' ')[1]);
    console.log('substring:', str.substring(0, str.length - 1));
    console.log('length:', str.length);
    console.log('splice:', str.slice(0, 5));
    console.log('charCodeAt:', str.charCodeAt(1));
    console.log('replace:', str, 'to', str.replace('Basic', 'Simple'));

    // string concat
    str = str + ' String'
    console.log('concat:', str);

    let res: ResObject = {
        code: 10,
        message: str
    }
    return c.json(res);
})

basic.get('/array', (c) => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    console.log('arr', arr);

    // array methods
    arr.push(10, 11, 12)
    console.log('join:', arr.join('-'));
    console.log('splice:', arr.splice(0, 2));
    console.log('Filter:', arr.filter((e) => e === 3));
    console.log('Find:', arr.find((e) => e === 3));
    console.log('Map:', arr.map((e) => ({ value: e })));

    let res: ResObject = {
        code: 10,
        message: 'Basic JavaScript/TypeScript Array'
    }
    return c.json(res);
})

export { basic }