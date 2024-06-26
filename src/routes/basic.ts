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
    const phone = 55555555
    /*
        const ແມ່ນຕົວປ່ຽນທີ່ບໍ່ສາມາດປ່ຽນແປງຄ່າໄດ້ ຫລື ບໍ່ສາມາດເອົາຄ່າໃຫມ່ໃສ່ໄດ້ ແລະ ຈຳກັດຂອບເຂດ
        phone = 22222222 (error)
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
        message: 'Basic TypeScript Variable'
    }
    return c.json(res);
})

export { basic }