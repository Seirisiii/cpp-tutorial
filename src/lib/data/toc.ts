export type Section = {
	num: string;
	slug: string;
	title: string;
};

export type Chapter = {
	num: number;
	title: string;
	sections: Section[];
};

export const chapters: Chapter[] = [
	{
		num: 1,
		title: 'การเริ่มต้นเขียนโปรแกรม',
		sections: [
			{ num: '1.1', slug: 'sec-1-1', title: 'การเริ่มต้นเขียนโปรแกรม' },
			{ num: '1.2', slug: 'sec-1-2', title: 'การใช้งานคอมไพล์เลอร์ g++' },
			{ num: '1.3', slug: 'sec-1-3', title: 'เครื่องมือในการเขียนโปรแกรม (IDE)' },
			{ num: '1.4', slug: 'sec-1-4', title: 'การลงรหัส (Coding)' },
			{ num: '1.5', slug: 'sec-1-5', title: 'การรับข้อมูลและแสดงผลเบื้องต้น' }
		]
	},
	{
		num: 2,
		title: 'โปรแกรมโครงสร้าง และภาษา C++',
		sections: [
			{ num: '2.1', slug: 'sec-2-1', title: 'โปรแกรมคอมพิวเตอร์และภาษาคอมพิวเตอร์' },
			{ num: '2.2', slug: 'sec-2-2', title: 'ภาษา C++ ในการเขียนโปรแกรม' },
			{ num: '2.3', slug: 'sec-2-3', title: 'โครงสร้างของโปรแกรม C++' },
			{ num: '2.4', slug: 'sec-2-4', title: 'ฟังก์ชัน main และ namespace' },
			{ num: '2.5', slug: 'sec-2-5', title: 'มาตรฐาน C++ ที่ควรรู้' }
		]
	},
	{
		num: 3,
		title: 'โครงสร้างของภาษา',
		sections: [
			{ num: '3.1', slug: 'sec-3-1', title: 'ชนิดของข้อมูล (Data Types)' },
			{ num: '3.2', slug: 'sec-3-2', title: 'ตัวแปร (Variables)' },
			{ num: '3.3', slug: 'sec-3-3', title: 'ค่าคงที่ (Constants)' },
			{ num: '3.4', slug: 'sec-3-4', title: 'ตัวปฏิบัติการ (Operators)' },
			{ num: '3.5', slug: 'sec-3-5', title: 'นิพจน์และข้อความสั่ง (Expressions & Statements)' }
		]
	},
	{
		num: 4,
		title: 'โครงสร้างควบคุม',
		sections: [
			{ num: '4.1', slug: 'sec-4-1', title: 'if และ if-else' },
			{ num: '4.2', slug: 'sec-4-2', title: 'switch' },
			{ num: '4.3', slug: 'sec-4-3', title: 'while loop' },
			{ num: '4.4', slug: 'sec-4-4', title: 'for loop' },
			{ num: '4.5', slug: 'sec-4-5', title: 'do-while loop' },
			{ num: '4.6', slug: 'sec-4-6', title: 'break, continue และ nested loop' }
		]
	},
	{
		num: 5,
		title: 'IO Redirection',
		sections: [
			{ num: '5.1', slug: 'sec-5-1', title: 'Input Redirection (<)' },
			{ num: '5.2', slug: 'sec-5-2', title: 'Output Redirection (>)' },
			{ num: '5.3', slug: 'sec-5-3', title: 'Append (>>) และ Pipe (|)' }
		]
	},
	{
		num: 6,
		title: 'การแก้ไขและ Debug',
		sections: [
			{ num: '6.1', slug: 'sec-6-1', title: 'ประเภทของข้อผิดพลาด' },
			{ num: '6.2', slug: 'sec-6-2', title: 'ข้อความ error จากคอมไพล์เลอร์' },
			{ num: '6.3', slug: 'sec-6-3', title: 'เทคนิค Debug เบื้องต้น' },
			{ num: '6.4', slug: 'sec-6-4', title: 'เครื่องมือ Debug ใน IDE' }
		]
	},
	{
		num: 7,
		title: 'อาร์เรย์ (Array)',
		sections: [
			{ num: '7.1', slug: 'sec-7-1', title: 'แนวคิดของอาร์เรย์' },
			{ num: '7.2', slug: 'sec-7-2', title: 'การประกาศและใช้งานอาร์เรย์' },
			{ num: '7.3', slug: 'sec-7-3', title: 'อาร์เรย์หลายมิติ' },
			{ num: '7.4', slug: 'sec-7-4', title: 'การรวมกลุ่มข้อมูลด้วยอาร์เรย์' },
			{ num: '7.5', slug: 'sec-7-5', title: 'ตัวอย่างการแก้ปัญหาด้วยอาร์เรย์' }
		]
	},
	{
		num: 8,
		title: 'ฟังก์ชัน (Functions)',
		sections: [
			{ num: '8.1', slug: 'sec-8-1', title: 'แนวคิดและการประกาศฟังก์ชัน' },
			{ num: '8.2', slug: 'sec-8-2', title: 'การคืนค่าผ่านฟังก์ชัน' },
			{ num: '8.3', slug: 'sec-8-3', title: 'พารามิเตอร์และการส่งค่า' },
			{ num: '8.4', slug: 'sec-8-4', title: 'ขอบเขตของตัวแปร (Scope)' },
			{ num: '8.5', slug: 'sec-8-5', title: 'Global และ Local Variable' }
		]
	},
	{
		num: 9,
		title: 'ฟังก์ชันเวียนเกิด (Recursion)',
		sections: [
			{ num: '9.1', slug: 'sec-9-1', title: 'แนวคิดของ Recursion' },
			{ num: '9.2', slug: 'sec-9-2', title: 'Base Case และ Recursive Case' },
			{ num: '9.3', slug: 'sec-9-3', title: 'ตัวอย่าง: Factorial และ Fibonacci' },
			{ num: '9.4', slug: 'sec-9-4', title: 'ข้อควรระวังเมื่อใช้ Recursion' }
		]
	},
	{
		num: 10,
		title: 'พอยน์เตอร์ (Pointer)',
		sections: [
			{ num: '10.1', slug: 'sec-10-1', title: 'ที่อยู่ในหน่วยความจำและพอยน์เตอร์' },
			{ num: '10.2', slug: 'sec-10-2', title: 'การประกาศและใช้งานพอยน์เตอร์' },
			{ num: '10.3', slug: 'sec-10-3', title: 'พอยน์เตอร์กับอาร์เรย์' },
			{ num: '10.4', slug: 'sec-10-4', title: 'พอยน์เตอร์กับฟังก์ชัน' }
		]
	},
	{
		num: 11,
		title: 'class และ struct',
		sections: [
			{ num: '11.1', slug: 'sec-11-1', title: 'struct ใน C++' },
			{ num: '11.2', slug: 'sec-11-2', title: 'class และการเข้าถึง (access specifier)' },
			{ num: '11.3', slug: 'sec-11-3', title: 'Constructor และ Destructor' },
			{ num: '11.4', slug: 'sec-11-4', title: 'Method และสมาชิกของ class' }
		]
	},
	{
		num: 12,
		title: 'การเรียงและค้นหาข้อมูล',
		sections: [
			{ num: '12.1', slug: 'sec-12-1', title: 'การเรียงข้อมูล (Sorting)' },
			{ num: '12.2', slug: 'sec-12-2', title: 'Bubble Sort, Selection Sort และ Insertion Sort' },
			{ num: '12.3', slug: 'sec-12-3', title: 'การค้นหาแบบ Linear Search' },
			{ num: '12.4', slug: 'sec-12-4', title: 'การค้นหาแบบ Binary Search' }
		]
	},
	{
		num: 13,
		title: 'สตริง (String)',
		sections: [
			{ num: '13.1', slug: 'sec-13-1', title: 'C-style string และ std::string' },
			{ num: '13.2', slug: 'sec-13-2', title: 'การอ่านและเขียนสตริง' },
			{ num: '13.3', slug: 'sec-13-3', title: 'การจัดการสตริงใน C++' },
			{ num: '13.4', slug: 'sec-13-4', title: 'ตัวอย่างการใช้งานสตริง' }
		]
	},
	{
		num: 14,
		title: 'Linked List',
		sections: [
			{ num: '14.1', slug: 'sec-14-1', title: 'แนวคิดของ Linked List' },
			{ num: '14.2', slug: 'sec-14-2', title: 'Singly Linked List' },
			{ num: '14.3', slug: 'sec-14-3', title: 'Doubly Linked List' },
			{ num: '14.4', slug: 'sec-14-4', title: 'Circular Linked List' },
			{ num: '14.5', slug: 'sec-14-5', title: 'ตัวอย่างการใช้งาน Linked List' }
		]
	},
	{
		num: 15,
		title: 'Stack',
		sections: [
			{ num: '15.1', slug: 'sec-15-1', title: 'แนวคิดของ Stack (LIFO)' },
			{ num: '15.2', slug: 'sec-15-2', title: 'การ Implement Stack ด้วยอาร์เรย์' },
			{ num: '15.3', slug: 'sec-15-3', title: 'การ Implement Stack ด้วย Linked List' },
			{ num: '15.4', slug: 'sec-15-4', title: 'std::stack ใน STL' }
		]
	},
	{
		num: 16,
		title: 'Queue',
		sections: [
			{ num: '16.1', slug: 'sec-16-1', title: 'แนวคิดของ Queue (FIFO)' },
			{ num: '16.2', slug: 'sec-16-2', title: 'การ Implement Queue ด้วยอาร์เรย์' },
			{ num: '16.3', slug: 'sec-16-3', title: 'การ Implement Queue ด้วย Linked List' },
			{ num: '16.4', slug: 'sec-16-4', title: 'std::queue ใน STL' }
		]
	}
];
