<script lang="ts">
	import CoverSection from '$lib/components/CoverSection.svelte';
	import ChapterDivider from '$lib/components/ChapterDivider.svelte';
	import ContentSection from '$lib/components/ContentSection.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import Callout from '$lib/components/Callout.svelte';
	import IOExample from '$lib/components/IOExample.svelte';
	import DataTable from '$lib/components/DataTable.svelte';
	import { chapters } from '$lib/data/toc';
	import { activeSlug } from '$lib/stores/nav';

	// Track which content-section is in view → update sidebar TOC highlight
	$effect(() => {
		const sections = [...document.querySelectorAll<HTMLElement>('section.content-section[id]')];
		if (!sections.length) return;

		function updateActive() {
			const topbarH = document.querySelector<HTMLElement>('.topbar')?.offsetHeight ?? 0;
			const threshold = topbarH + 24;
			let active = sections[0].id;
			for (const s of sections) {
				if (s.getBoundingClientRect().top <= threshold) active = s.id;
			}
			activeSlug.set(active);
		}

		window.addEventListener('scroll', updateActive, { passive: true });
		updateActive();
		return () => window.removeEventListener('scroll', updateActive);
	});
</script>

<svelte:head>
	<title>C++ Tutorial</title>
	<meta name="description" content="C++ สำหรับใช้อบรมค่ายโอลิมปิกวิชาการ สอวน.คอมพิวเตอร์ ค่าย 1" />
</svelte:head>

<ProgressBar />
<CoverSection />

<!-- ===== บทที่ 1 ===== -->
<ChapterDivider num={1} title={chapters[0].title} />

<ContentSection id="sec-1-1">
	<SectionHeading num="1.1" title="การเริ่มต้นเขียนโปรแกรม" />
	<div class="section-body">
		<p>การเขียนโปรแกรม (Programming) คือกระบวนการออกแบบและสร้างชุดคำสั่งให้คอมพิวเตอร์ทำงานตามที่เราต้องการ</p>
		<p>กระบวนการพื้นฐานที่ควรคุ้นเคย ประกอบด้วย 4 ขั้นตอน:</p>
		<p><strong>วิเคราะห์ปัญหา → ออกแบบอัลกอริทึม → เขียนโค้ด → ทดสอบและแก้ไข</strong></p>
		<Callout type="definition">
			<p><strong>โปรแกรม (Program)</strong> คือลำดับคำสั่งที่คอมพิวเตอร์สามารถประมวลผลได้ โดยเริ่มจากจุดเข้า <code>main()</code> และทำงานทีละคำสั่ง</p>
		</Callout>
		<h3 class="sub-heading">ขั้นตอนการพัฒนาโปรแกรม</h3>
		<ol>
			<li>เขียน source code ในไฟล์ <code>.cpp</code> เช่น <code>main.cpp</code></li>
			<li>คอมไพล์ด้วย <code>g++</code> เพื่อสร้างไฟล์ executable</li>
			<li>รันโปรแกรมและตรวจผลลัพธ์</li>
			<li>แก้ไข (debug) จนได้ผลถูกต้องตามโจทย์</li>
		</ol>
		<Callout type="tip">
			<p>ในการแข่งขัน ให้เริ่มจากอ่านโจทย์ให้ครบ ระบุ input/output format แล้วเขียนโค้ดทีละส่วน อย่ารีบส่งก่อนทดสอบกับตัวอย่างในโจทย์</p>
		</Callout>
	</div>
</ContentSection>

<ContentSection id="sec-1-2">
	<SectionHeading num="1.2" title="การใช้งานคอมไพล์เลอร์ g++" />
	<div class="section-body">
		<p><code>g++</code> เป็นคอมไพล์เลอร์ GNU สำหรับ C++ ที่ใช้กันแพร่หลายในระบบจัดการการแข่งขัน (เช่น DOMjudge, CMS) บน Linux, macOS และ Windows (MinGW/MSYS2)</p>
		<h3 class="sub-heading">คำสั่งคอมไพล์มาตรฐาน</h3>
		<CodeBlock lang="bash" code={`g++ -std=c++20 -Wall -Wextra -O2 -o program main.cpp\n./program`} caption="คำสั่งใน Terminal / Command Prompt" />
		<DataTable caption="สรุป flag ที่ใช้บ่อย">
			<thead>
				<tr><th>ตัวเลือก</th><th>ความหมาย</th></tr>
			</thead>
			<tbody>
				<tr><td><code>-std=c++20</code></td><td>ใช้มาตรฐาน C++20</td></tr>
				<tr><td><code>-Wall -Wextra</code></td><td>แสดงคำเตือน</td></tr>
				<tr><td><code>-O2</code></td><td>เปิดการ optimize</td></tr>
				<tr><td><code>-o ชื่อ</code></td><td>ตั้งชื่อไฟล์ output</td></tr>
			</tbody>
		</DataTable>
		<h3 class="sub-heading">คอมไพล์หลายไฟล์</h3>
		<CodeBlock lang="bash" code={`g++ -std=c++20 -Wall -o program main.cpp utils.cpp math.cpp`} />
		<Callout type="note">
			<p>ถ้า compile ไม่ผ่าน ให้อ่าน error จาก<strong>บรรทัดแรกที่เกี่ยวข้อง</strong> มักบอกเลขบรรทัดและสาเหตุ เช่น ลืม semicolon, วงเล็บไม่ครบ</p>
		</Callout>
	</div>
</ContentSection>

<ContentSection id="sec-1-3">
	<SectionHeading num="1.3" title="เครื่องมือในการเขียนโปรแกรม (IDE)" />
	<div class="section-body">
		<p>IDE (Integrated Development Environment) รวม editor, debugger, build system และบางครั้งมี version control ไว้ในที่เดียว ช่วยให้เขียนและ debug ได้เร็วขึ้น</p>
		<h3 class="sub-heading">เครื่องมือที่แนะนำ</h3>
		<DataTable>
			<thead>
				<tr><th>เครื่องมือ</th><th>จุดเด่น</th><th>เหมาะกับ</th></tr>
			</thead>
			<tbody>
				<tr><td><strong>VS Code</strong></td><td>ฟรี, ยืดหยุ่น</td><td>มืออาชีพ</td></tr>
				<tr><td><strong>Sublime Text</strong></td><td>ทำงานได้รวดเร็ว</td><td>การแข่งขัน</td></tr>
				<tr><td><strong>CLion</strong></td><td>Debug/refactor ดี</td><td>โปรเจกต์ใหญ่</td></tr>
				<tr><td><strong>Code::Blocks / Dev-C++</strong></td><td>ติดตั้งง่าย</td><td>ผู้เริ่มต้น</td></tr>
			</tbody>
		</DataTable>
		<Callout type="tip">
			<p>ให้เรียนรู้ทั้ง IDE และคำสั่ง <code>g++</code> ใน terminal เพราะในการสอบและการแข่งขัน มักต้อง compile บน server โดยไม่มี IDE</p>
		</Callout>
	</div>
</ContentSection>

<ContentSection id="sec-1-4">
	<SectionHeading num="1.4" title="การลงรหัส (Coding)" />
	<div class="section-body">
		<p>การลงรหัส (Coding) คือการแปลงอัลกอริทึมที่ออกแบบไว้ ให้เป็นคำสั่ง C++ ที่คอมพิวเตอร์เข้าใจ โค้ดที่อ่านง่ายช่วยให้ตรวจงาน ทำงานเป็นทีม และ debug ได้เร็วขึ้น</p>
		<h3 class="sub-heading">หลักการเขียนโค้ดที่ดี</h3>
		<ul>
			<li>ตั้งชื่อตัวแปร/ฟังก์ชันให้สื่อความหมาย เช่น <code>studentCount</code> แทน <code>x</code></li>
			<li>จัด indent ให้สม่ำเสมอ (แนะนำ 4 spaces)</li>
			<li>แบ่งปัญหาใหญ่เป็นฟังก์ชันย่อย ๆ</li>
			<li>เขียน comment อธิบาย ทำไม ไม่ใช่แค่ ทำอะไร</li>
		</ul>
		<CodeBlock lang="cpp" code={`#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl; // แสดงข้อความ\n    return 0;  // โปรแกรมทำงานสำเร็จ\n}`} caption="โปรแกรม Hello World แบบอ่านง่าย" />
		<Callout type="tip" label="Template">
			<p>เก็บ template โปรแกรมมาตรฐานไว้ copy ใช้ทุกครั้ง จะประหยัดเวลาในการแข่งขัน</p>
		</Callout>
		<CodeBlock lang="cpp" code={`#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    // your code here\n\n    return 0;\n}`} caption="Template มาตรฐานสำหรับ competitive programming" />
	</div>
</ContentSection>

<ContentSection id="sec-1-5">
	<SectionHeading num="1.5" title="การรับข้อมูลและแสดงผลเบื้องต้น" />
	<div class="section-body">
		<p>การรับข้อมูล (Input) และแสดงผล (Output) เป็นพื้นฐานของทุกโจทย์ ใน C++ ใช้ <code>cin</code> รับข้อมูล และ <code>cout</code> แสดงผล ผ่าน stream มาตรฐาน</p>
		<h3 class="sub-heading">A+B Problem</h3>
		<CodeBlock lang="cpp" code={`#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b; // อ่าน 2 ตัวคั่นด้วย space\n    cout << a + b << endl; // แสดงผลรวม\n    return 0;\n}`} caption="อ่านจำนวนเต็ม 2 ค่า แล้วแสดงผล" />
		<IOExample input="5 4" output="9" />
		<Callout type="warning">
			<p><code>cin &gt;&gt;</code> อ่านทีละ token (คั่นด้วย space) ถ้าต้องการอ่าน<strong>ทั้งบรรทัด</strong> รวม space ใช้ <code>getline(cin, str)</code></p>
		</Callout>
	</div>
</ContentSection>

<!-- ===== บทที่ 2 ===== -->
<ChapterDivider num={2} title={chapters[1].title} />

<ContentSection id="sec-2-1">
	<SectionHeading num="2.1" title="โปรแกรมคอมพิวเตอร์และภาษาคอมพิวเตอร์" />
	<div class="section-body">
		<p>คอมพิวเตอร์ประมวลผลด้วยคำสั่งไบนารี (0 และ 1) ที่ CPU ทำความเข้าใจโดยตรง มนุษย์ไม่สามารถเขียน machine code ได้อย่างมีประสิทธิภาพ จึงต้องใช้<strong>ภาษาระดับสูง</strong> เช่น C++ เป็นตัวกลาง</p>
		<p>คอมไพล์เลอร์แปลง source code เป็น object code แล้ว linker รวมเป็น executable ที่รันได้</p>
		<DataTable>
			<thead>
				<tr><th>ระดับ</th><th>ตัวอย่าง</th><th>ลักษณะ</th></tr>
			</thead>
			<tbody>
				<tr><td>Machine</td><td>01001101</td><td>CPU อ่านได้โดยตรง</td></tr>
				<tr><td>Assembly</td><td>MOV AX, 5</td><td>ใกล้ hardware, ยากต่อมนุษย์</td></tr>
				<tr><td>High-level</td><td>C++, Python, Java</td><td>อ่านง่าย, ต้อง compile/interpret</td></tr>
			</tbody>
		</DataTable>
		<Callout type="definition">
			<p><strong>ภาษาคอมพิวเตอร์</strong> — ชุดกฎและไวยากรณ์สำหรับเขียนคำสั่งให้คอมพิวเตอร์ทำงาน</p>
		</Callout>
	</div>
</ContentSection>

<ContentSection id="sec-2-2">
	<SectionHeading num="2.2" title="ภาษา C++ ในการเขียนโปรแกรม" />
	<div class="section-body">
		<p>C++ พัฒนาต่อจาก C โดย Bjarne Stroustrup ปี 1983 รองรับ procedural, object-oriented และ generic programming ใช้กันแพร่หลายในอุตสาหกรรมซอฟต์แวร์ และการเขียนโปรแกรมเชิงแข่งขัน</p>
		<ul>
			<li><strong>ประสิทธิภาพสูง</strong> — ใกล้ hardware เหมาะกับงานที่ต้องเร็ว</li>
			<li><strong>STL</strong> — มี container และ algorithm สำเร็จรูป</li>
			<li><strong>หลาย paradigm</strong> — procedural, OOP, template</li>
			<li><strong>ข้ามแพลตฟอร์ม</strong> — Linux, Windows, macOS</li>
		</ul>
		<Callout type="tip" label="เพิ่มเติม">
			<p>C++ เป็นภาษาหลักใน IOI, TOI และ ICPC เพราะ STL ช่วยลดเวลา implement</p>
		</Callout>
	</div>
</ContentSection>

<ContentSection id="sec-2-3">
	<SectionHeading num="2.3" title="โครงสร้างของโปรแกรม C++" />
	<div class="section-body">
		<p>โปรแกรม C++ ประกอบด้วยส่วนหลัก: <strong>preprocessor directives</strong>, <strong>declarations</strong>, <strong>definitions</strong> และฟังก์ชัน <code>main</code></p>
		<CodeBlock lang="cpp" code={`#include <iostream>    // 1) นำเข้า library (preprocessor)\nusing namespace std;   // 2) ใช้ namespace (optional)\n\nint add(int a, int b) { // 3) ฟังก์ชันช่วย\n    return a + b;\n}\n\nint main() {            // 4) จุดเริ่มต้นโปรแกรม\n    int result = add(3, 4);\n    cout << result << endl;\n    return 0;\n}`} caption="โครงสร้างโปรแกรม C++ แบบสมบูรณ์" />
		<Callout type="note">
			<p>ทุก executable ต้องมี <code>int main()</code> เป็นจุดเข้า ค่า <code>return 0</code> หมายถึงสำเร็จ</p>
		</Callout>
	</div>
</ContentSection>

<ContentSection id="sec-2-4">
	<SectionHeading num="2.4" title="ฟังก์ชัน main และ namespace" />
	<div class="section-body">
		<p><code>main()</code> เป็นฟังก์ชันแรกที่ OS เรียกเมื่อรันโปรแกรม</p>
		<p><code>namespace</code> จัดกลุ่มชื่อป้องกันการชนกัน — <code>std</code> คือ namespace ของ Standard Library</p>
		<CodeBlock lang="cpp" code={`#include <iostream>\n\nnamespace Math {\n    int add(int a, int b) { return a + b; }\n    int mul(int a, int b) { return a * b; }\n}\n\nint main() {\n    std::cout << Math::add(3, 4) << std::endl;  // 7\n    std::cout << Math::mul(3, 4) << std::endl;  // 12\n    return 0;\n}`} caption="namespace แยกกลุ่มฟังก์ชัน" />
	</div>
</ContentSection>

<ContentSection id="sec-2-5">
	<SectionHeading num="2.5" title="มาตรฐาน C++ ที่ควรรู้" />
	<div class="section-body">
		<p>C++ เป็นมาตรฐานที่ใช้ในระบบ judge สมัยใหม่ ฟีเจอร์ที่ควรรู้จักตั้งแต่ต้น:</p>
		<DataTable>
			<thead>
				<tr><th>ฟีเจอร์</th><th>ตัวอย่าง</th><th>ประโยชน์</th></tr>
			</thead>
			<tbody>
				<tr><td><code>auto</code></td><td>auto x = 42;</td><td>ให้ compiler อนุมานชนิด</td></tr>
				<tr><td>Range-for</td><td>for (auto v : vec)</td><td>วน container สะดวก</td></tr>
				<tr><td><code>std::vector</code></td><td>vector&lt;int&gt; v;</td><td>array ยืดหยุ่น</td></tr>
				<tr><td><code>nullptr</code></td><td>int* p = nullptr;</td><td>pointer ว่างที่ปลอดภัย</td></tr>
			</tbody>
		</DataTable>
		<CodeBlock lang="cpp" code={`#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    auto numbers = vector{1, 2, 3, 4, 5};\n\n    for (auto value : numbers) {\n        cout << value << " ";\n    }\n    cout << endl;\n    return 0;\n}`} caption="C++: auto + range-based for + vector" />
	</div>
</ContentSection>

<!-- ===== บทที่ 3 ===== -->
<ChapterDivider num={3} title={chapters[2].title} />

<ContentSection id="sec-3-1">
	<SectionHeading num="3.1" title="ชนิดของข้อมูล (Data Types)" />
	<div class="section-body">
		<p>ชนิดข้อมูล (data type) กำหนดว่าตัวแปรเก็บค่าประเภทใด ใช้หน่วยความจำเท่าใด และทำ operation อะไรได้</p>
		<DataTable caption="ชนิดข้อมูลพื้นฐานใน C++">
			<thead>
				<tr><th>ชนิด</th><th>ขนาด</th><th>ช่วงค่า</th><th>สำหรับ</th></tr>
			</thead>
			<tbody>
				<tr><td><code>int</code></td><td>4 bytes</td><td>-2,147,483,648 ถึง 2,147,483,647</td><td>จำนวนเต็ม</td></tr>
				<tr><td><code>long long</code></td><td>8 bytes</td><td>-9.2×10¹⁸ ถึง 9.2×10¹⁸</td><td>จำนวนเต็มขนาดใหญ่</td></tr>
				<tr><td><code>double</code></td><td>8 bytes</td><td>1.7×10⁻³⁰⁸ ถึง 1.7×10³⁰⁸</td><td>ทศนิยม</td></tr>
				<tr><td><code>char</code></td><td>1 byte</td><td>-128 ถึง 127</td><td>ตัวอักษร</td></tr>
				<tr><td><code>bool</code></td><td>1 byte</td><td>true/false</td><td>เงื่อนไข</td></tr>
			</tbody>
		</DataTable>
		<Callout type="warning">
			<p>ถ้าคูณหรือบวกแล้วมากกว่า 2×10⁹ หรือน้อยกว่า -2×10⁹ ให้ใช้ <code>long long</code></p>
		</Callout>
		<CodeBlock lang="cpp" code={`#include <iostream>\nusing namespace std;\n\nint main() {\n    int count = 100;\n    long long bigNumber = 1000000000000LL;\n    double pi = 3.14159;\n    char grade = 'A';\n    bool passed = true;\n\n    cout << count << " " << bigNumber << " " << pi << endl;\n    return 0;\n}`} />
	</div>
</ContentSection>

<ContentSection id="sec-3-2">
	<SectionHeading num="3.2" title="ตัวแปร (Variables)" />
	<div class="section-body">
		<p>ตัวแปร (variable) เป็นชื่อที่อ้างถึงพื้นที่ในหน่วยความจำ ต้อง<strong>ประกาศชนิด</strong>ก่อนใช้งาน</p>
		<CodeBlock lang="cpp" code={`#include <iostream>\nusing namespace std;\n\nint main() {\n    int score = 85;       // ประกาศ + กำหนดค่าเริ่มต้น\n    int bonus;            // ประกาศอย่างเดียว (ค่าไม่แน่นอน!)\n    bonus = 10;           // กำหนดค่าทีหลัง\n\n    score = score + bonus;  // เปลี่ยนค่าได้\n    cout << score << endl;  // 95\n    return 0;\n}`} caption="การประกาศและเปลี่ยนค่าตัวแปร" />
		<Callout type="warning">
			<p>ตัวแปรที่ประกาศแต่ไม่ initialize อาจมีค่าขยะ (garbage value) — ควรกำหนดค่าเสมอ</p>
		</Callout>
	</div>
</ContentSection>

<ContentSection id="sec-3-3">
	<SectionHeading num="3.3" title="ค่าคงที่ (Constants)" />
	<div class="section-body">
		<p>ค่าคงที่ (constant) ไม่เปลี่ยนแปลงหลังกำหนด ช่วยป้องกัน bug และทำให้โค้ดอ่านง่าย</p>
		<CodeBlock lang="cpp" code={`#include <iostream>\nusing namespace std;\n\nint main() {\n    const int MAX_STUDENTS = 50;\n    const double PI = 3.14159265;\n    constexpr int ARRAY_SIZE = 100;  // คำนวณตอน compile\n\n    // MAX_STUDENTS = 60;  // ERROR: แก้ไม่ได้\n\n    cout << "Max: " << MAX_STUDENTS << endl;\n    return 0;\n}`} />
		<Callout type="tip">
			<p>ใช้ <code>const</code> กับค่าที่ไม่ควรเปลี่ยน เช่น ขนาด array, ค่าทางฟิสิกส์</p>
		</Callout>
	</div>
</ContentSection>

<ContentSection id="sec-3-4">
	<SectionHeading num="3.4" title="ตัวปฏิบัติการ (Operators)" />
	<div class="section-body">
		<p>ตัวปฏิบัติการ (operator) ใช้คำนวณ เปรียบเทียบ และรวมเงื่อนไข</p>
		<DataTable>
			<thead>
				<tr><th>กลุ่ม</th><th>ตัวปฏิบัติการ</th><th>ตัวอย่าง</th></tr>
			</thead>
			<tbody>
				<tr><td>Arithmetic</td><td>+ − * / %</td><td>10 / 3 = 3 (หารเศษทิ้ง)</td></tr>
				<tr><td>Comparison</td><td>== != &lt; &gt; &lt;= &gt;=</td><td>a == b → true/false</td></tr>
				<tr><td>Logical</td><td>&amp;&amp; || !</td><td>(a&gt;0) &amp;&amp; (b&gt;0)</td></tr>
				<tr><td>Assignment</td><td>= += -= *= /=</td><td>x += 5 ≡ x = x + 5</td></tr>
			</tbody>
		</DataTable>
		<CodeBlock lang="cpp" code={`#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 10, b = 3;\n\n    cout << "a + b = " << (a + b) << endl;   // 13\n    cout << "a / b = " << (a / b) << endl;   // 3 (integer division!)\n    cout << "a % b = " << (a % b) << endl;   // 1 (เศษ)\n    cout << "a > b  = " << (a > b) << endl;  // 1 (true)\n\n    return 0;\n}`} />
		<Callout type="warning">
			<p>หารจำนวนเต็ม (<code>int / int</code>) ตัดเศษทิ้ง — ใช้ <code>double</code> ถ้าต้องการทศนิยม</p>
		</Callout>
	</div>
</ContentSection>

<ContentSection id="sec-3-5">
	<SectionHeading num="3.5" title="นิพจน์และข้อความสั่ง (Expressions & Statements)" />
	<div class="section-body">
		<p><strong>นิพจน์ (Expression)</strong> มีค่า เช่น <code>3 + 4 * 2</code> มีค่า 11 ตามลำดับความสำคัญของ operator</p>
		<p><strong>ข้อความสั่ง (Statement)</strong> เป็นคำสั่งที่ทำให้โปรแกรมดำเนินการ เช่น การกำหนดค่า, if, return</p>
		<CodeBlock lang="cpp" code={`#include <iostream>\nusing namespace std;\n\nint main() {\n    int x = 5, y = 3;\n\n    int result = (x + y) * 2;     // expression ใน statement\n    cout << result << endl;       // statement: แสดงผล\n    return 0;                     // statement: จบโปรแกรม\n}`} />
	</div>
</ContentSection>

<!-- ===== บทที่ 4 ===== -->
<ChapterDivider num={4} title={chapters[3].title} />

<ContentSection id="sec-4-1">
	<SectionHeading num="4.1" title="if และ if-else" />
	<div class="section-body">
		<p>โครงสร้าง <code>if-else</code> เลือกทำงานตามเงื่อนไข boolean (true/false)</p>
		<CodeBlock lang="cpp" code={`#include <iostream>\nusing namespace std;\n\nint main() {\n    int score;\n    cin >> score;\n\n    if (score >= 50) {\n        cout << "Pass" << endl;\n    } else {\n        cout << "Fail" << endl;\n    }\n\n    // if-else if หลายเงื่อนไข\n    if (score >= 80) cout << "Grade A" << endl;\n    else if (score >= 70) cout << "Grade B" << endl;\n    else if (score >= 60) cout << "Grade C" << endl;\n    else cout << "Grade F" << endl;\n\n    return 0;\n}`} caption="ตรวจผ่าน/ตก และให้เกรด" />
		<IOExample input="75" output={`Pass\nGrade B`} />
	</div>
</ContentSection>

<ContentSection id="sec-4-2">
	<SectionHeading num="4.2" title="switch" />
	<div class="section-body">
		<p><code>switch</code> เหมาะเมื่อเปรียบเทียบตัวแปรหนึ่งตัวกับหลายค่าคงที่</p>
		<CodeBlock lang="cpp" code={`#include <iostream>\nusing namespace std;\n\nint main() {\n    int day;\n    cin >> day;\n\n    switch (day) {\n        case 1: cout << "Monday";    break;\n        case 2: cout << "Tuesday";   break;\n        case 3: cout << "Wednesday"; break;\n        case 4: cout << "Thursday";  break;\n        case 5: cout << "Friday";    break;\n        default: cout << "Weekend";  break;\n    }\n    cout << endl;\n    return 0;\n}`} />
		<Callout type="note">
			<p>ต้องใส่ <code>break</code> หลังแต่ละ case ไม่งั้นจะ fall-through ไป case ถัดไป</p>
		</Callout>
	</div>
</ContentSection>

<ContentSection id="sec-4-3">
	<SectionHeading num="4.3" title="while loop" />
	<div class="section-body">
		<p>เมื่อโปรแกรมมาถึงบรรทัด <code>while</code> โปรแกรมจะทำการเช็คเงื่อนไข ถ้าเงื่อนไขเป็นจริง โค้ดในปีกกาจะทำงาน แล้วจึงเช็คเงื่อนไขอีกเรื่อยๆ หากเงื่อนไขเป็นเท็จ โค้ดจะข้ามไปหลังปีกกาทันที</p>
		<CodeBlock lang="cpp" code={`#include <iostream>\nusing namespace std;\n\nint main() {\n    int i = 1;\n\n    while (i <= 5) {\n        cout << i << " ";\n        i++;  // เหมือนกับ i = i + 1\n    }\n    cout << endl;\n    return 0;\n}`} caption="พิมพ์ 1 ถึง 5" />
	</div>
</ContentSection>

<ContentSection id="sec-4-4">
	<SectionHeading num="4.4" title="for loop" />
	<div class="section-body">
		<p>เมื่อโปรแกรมมาถึงบรรทัด <code>for</code> โปรแกรมจะทำงานส่วน init ก่อนหนึ่งครั้ง แล้วจึงเช็คเงื่อนไข ถ้าเงื่อนไขเป็นจริง โค้ดส่วน statements จะรัน ตามด้วย end แล้วจึงเช็คเงื่อนไขอีกครั้ง ถ้าเงื่อนไขเป็นเท็จ จะข้ามไปหลังปีกกาทันที</p>
		<CodeBlock lang="cpp" code={`#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    // แบบ classic for\n    for (int i = 0; i < 5; i++) {\n        cout << i << " ";\n    }\n    cout << endl;\n\n    // แบบ range-based for\n    vector<int> nums = {10, 20, 30};\n    for (int value : nums) {\n        cout << value << " ";\n    }\n    cout << endl;\n\n    return 0;\n}`} />
	</div>
</ContentSection>

<ContentSection id="sec-4-5">
	<SectionHeading num="4.5" title="do-while loop" />
	<div class="section-body">
		<p>คล้ายกับ <code>while</code> แต่จะทำงานก่อน แล้วค่อยเช็คเงื่อนไข หากเงื่อนไขเป็นจริงก็จะทำซ้ำอีก แต่หากเป็นเท็จ ก็จะเลิกทำ วิธีนี้ โค้ดใน loop จะทำงานอย่างน้อย 1 ครั้ง</p>
		<CodeBlock lang="cpp" code={`#include <iostream>\nusing namespace std;\n\nint main() {\n    int number;\n\n    do {\n        cout << "Enter a positive number: ";\n        cin >> number;\n    } while (number <= 0);\n\n    cout << "You entered: " << number << endl;\n    return 0;\n}`} caption="บังคับให้ใส่เลขบวก" />
	</div>
</ContentSection>

<ContentSection id="sec-4-6">
	<SectionHeading num="4.6" title="break, continue และ nested loop" />
	<div class="section-body">
		<p><code>break</code> ออกจากลูปทันที</p>
		<p><code>continue</code> ข้ามรอบปัจจุบันไปรอบถัดไป</p>
		<CodeBlock lang="cpp" code={`#include <iostream>\nusing namespace std;\n\nint main() {\n    // แสดงเลขคี่ 1-7\n    for (int i = 1; i <= 10; i++) {\n        if (i % 2 == 0) continue;  // ข้ามเลขคู่\n        if (i > 7) break;          // หยุดเมื่อเกิน 7\n        cout << i << " ";\n    }\n    cout << endl;  // 1 3 5 7\n    return 0;\n}`} />
		<h3 class="sub-heading">Nested loop — ตารางคูณ</h3>
		<CodeBlock lang="cpp" code={`#include <iostream>\nusing namespace std;\n\nint main() {\n    for (int i = 1; i <= 3; i++) {\n        for (int j = 1; j <= 3; j++) {\n            cout << i << "x" << j << "=" << (i*j) << "  ";\n        }\n        cout << endl;\n    }\n    return 0;\n}`} />
	</div>
</ContentSection>

<!-- ===== บทที่ 5 ===== -->
<ChapterDivider num={5} title={chapters[4].title} />

<ContentSection id="sec-5-1">
	<SectionHeading num="5.1" title="Input Redirection (<)" />
	<div class="section-body">
		<p>Input redirection (<code>&lt;</code>) ส่งเนื้อหาไฟล์เข้า <code>stdin</code> แทน keyboard — โปรแกรมยังใช้ <code>cin</code> เหมือนเดิม</p>
		<CodeBlock lang="bash" code={`# สร้างไฟล์ input.txt\n# 5\n# 10\n\n./program < input.txt`} caption="รันโปรแกรมโดยอ่าน input จากไฟล์" />
		<CodeBlock lang="cpp" code={`#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b << endl;\n    return 0;\n}`} caption="โปรแกรมที่ใช้ cin ตามปกติ" />
	</div>
</ContentSection>

<ContentSection id="sec-5-2">
	<SectionHeading num="5.2" title="Output Redirection (>)" />
	<div class="section-body">
		<p>Output redirection (<code>&gt;</code>) ส่งผลลัพธ์ไปไฟล์แทนหน้าจอ</p>
		<CodeBlock lang="bash" code={`./program > output.txt          # เขียนทับ\n./program < input.txt > out.txt # อ่านจากไฟล์ + เขียนไปไฟล์`} />
	</div>
</ContentSection>

<ContentSection id="sec-5-3">
	<SectionHeading num="5.3" title="Append (>>) และ Pipe (|)" />
	<div class="section-body">
		<p><code>&gt;&gt;</code> ต่อท้ายไฟล์ · <code>|</code> (pipe) ส่ง output โปรแกรมหนึ่งเป็น input ของอีกโปรแกรม</p>
		<CodeBlock lang="bash" code={`./program >> log.txt    # append log\n./program | sort        # ส่ง output ไป sort\n./program | grep Pass   # กรองบรรทัดที่มี Pass`} />
	</div>
</ContentSection>

<!-- ===== บทที่ 6 ===== -->
<ChapterDivider num={6} title={chapters[5].title} />

<ContentSection id="sec-6-1">
	<SectionHeading num="6.1" title="ประเภทของข้อผิดพลาด" />
	<div class="section-body">
		<DataTable caption="สามประเภทข้อผิดพลาด">
			<thead>
				<tr><th>ประเภท</th><th>เมื่อเกิด</th><th>ตัวอย่าง</th><th>วิธีแก้</th></tr>
			</thead>
			<tbody>
				<tr><td>Syntax Error</td><td>Compile ไม่ผ่าน</td><td>ลืม ; วงเล็บไม่ครบ</td><td>อ่าน error จาก compiler</td></tr>
				<tr><td>Runtime Error</td><td>รันแล้ว crash</td><td>หาร 0, index เกิน</td><td>ตรวจ edge case</td></tr>
				<tr><td>Logic Error</td><td>รันได้ ผลผิด</td><td>เงื่อนไข if ผิด</td><td>ทดสอบด้วยมือ + debug</td></tr>
			</tbody>
		</DataTable>
		<p>ในการสอบและแข่งขัน Logic Error เป็นปัญหาที่พบบ่อยที่สุด — ต้องทดสอบกับ input เล็ก ๆ ที่คำนวณมือได้</p>
	</div>
</ContentSection>

<ContentSection id="sec-6-2">
	<SectionHeading num="6.2" title="ข้อความ error จากคอมไพล์เลอร์" />
	<div class="section-body">
		<p>Compiler แสดง error พร้อม<strong>ชื่อไฟล์ บรรทัด และสาเหตุ</strong></p>
		<CodeBlock lang="text" code={`main.cpp:5:5: error: expected ';' before 'return'\n    5 |     return 0\n      |     ^~~~~~`} />
		<ol>
			<li>อ่านบรรทัด <code>error:</code> ก่อน</li>
			<li>ดูเลขบรรทัด (เช่น <code>5:5</code>)</li>
			<li>ตรวจบรรทัดก่อนหน้าด้วย — error อาจเป็นผลพวง</li>
		</ol>
		<Callout type="warning">
			<p>Warning ไม่ทำให้ compile ล้ม แต่ควรแก้ — อาจซ่อน bug</p>
		</Callout>
	</div>
</ContentSection>

<ContentSection id="sec-6-3">
	<SectionHeading num="6.3" title="เทคนิค Debug เบื้องต้น" />
	<div class="section-body">
		<p>เทคนิค debug ที่ใช้ได้ทั้งในมหาวิทยาลัยและค่าย:</p>
		<ul>
			<li><strong>Print debugging</strong> — ใส่ cout ดูค่าตัวแปร</li>
			<li><strong>ทดสอบ input เล็ก</strong> — คำนวณมือแล้วเทียบ</li>
			<li><strong>แบ่งโค้ด</strong> — comment ส่วนที่สงสัย ทดสอบทีละส่วน</li>
			<li><strong>ใช้ cerr</strong> — debug output ไป stderr ไม่ปน output จริง</li>
		</ul>
		<CodeBlock lang="cpp" code={`#include <iostream>\nusing namespace std;\n\nint main() {\n    int n = 5, sum = 0;\n    for (int i = 1; i <= n; i++) {\n        sum += i;\n        cerr << "[debug] i=" << i << " sum=" << sum << endl;\n    }\n    cout << sum << endl;\n    return 0;\n}`} caption="Print debugging ด้วย cerr" />
	</div>
</ContentSection>

<ContentSection id="sec-6-4">
	<SectionHeading num="6.4" title="เครื่องมือ Debug ใน IDE" />
	<div class="section-body">
		<p>IDE มีเครื่องมือ debug ที่ช่วยในรายวิชา lab:</p>
		<ul>
			<li><strong>Breakpoint</strong> — หยุดที่บรรทัดที่กำหนด</li>
			<li><strong>Step Over/Into</strong> — ไล่ทีละบรรทัด/เข้าในฟังก์ชัน</li>
			<li><strong>Watch</strong> — ดูค่าตัวแปรแบบ real-time</li>
		</ul>
	</div>
</ContentSection>

<!-- ===== บทที่ 7 ===== -->
<ChapterDivider num={7} title={chapters[6].title} />

<ContentSection id="sec-7-1">
	<SectionHeading num="7.1" title="แนวคิดของอาร์เรย์" />
	<div class="section-body">
		<p>อาร์เรย์ (array) เก็บข้อมูลชนิดเดียวกันหลายตัวในหน่วยความจำต่อเนื่อง เข้าถึงด้วย index เริ่มจาก <strong>0</strong></p>
		<Callout type="definition">
			<p><strong>Array</strong> — โครงสร้างเก็บข้อมูลหลาย element โดยแต่ละ element มี index เป็นตัวเลข</p>
		</Callout>
		<DataTable>
			<thead>
				<tr><th>Operation</th><th>Time</th><th>หมายเหตุ</th></tr>
			</thead>
			<tbody>
				<tr><td>เข้าถึง arr[i]</td><td>O(1)</td><td>คำนวณ address ตรง</td></tr>
				<tr><td>ค้นหา (linear)</td><td>O(n)</td><td>ไล่ทุกตัว</td></tr>
				<tr><td>แทรก/ลบกลาง</td><td>O(n)</td><td>ต้องเลื่อนข้อมูล</td></tr>
			</tbody>
		</DataTable>
	</div>
</ContentSection>

<ContentSection id="sec-7-2">
	<SectionHeading num="7.2" title="การประกาศและใช้งานอาร์เรย์" />
	<div class="section-body">
		<CodeBlock lang="cpp" code={`#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n\n    cout << arr[0] << endl;  // 10 (ตัวแรก)\n    cout << arr[4] << endl;  // 50 (ตัวสุดท้าย)\n\n    arr[2] = 100;  // เปลี่ยนค่าตำแหน่ง index 2\n\n    int n = 5;\n    for (int i = 0; i < n; i++) {\n        cout << arr[i] << " ";\n    }\n    cout << endl;\n    return 0;\n}`} caption="ประกาศ แก้ไข และวนลูป array" />
		<Callout type="warning">
			<p>index ต้องอยู่ในช่วง 0 ถึง n-1 — <code>arr[n]</code> เป็น out-of-bounds (undefined behavior)</p>
		</Callout>
	</div>
</ContentSection>

<ContentSection id="sec-7-3">
	<SectionHeading num="7.3" title="อาร์เรย์หลายมิติ" />
	<div class="section-body">
		<CodeBlock lang="cpp" code={`#include <iostream>\nusing namespace std;\n\nint main() {\n    int matrix[3][4] = {\n        {1,  2,  3,  4},\n        {5,  6,  7,  8},\n        {9, 10, 11, 12}\n    };\n\n    for (int i = 0; i < 3; i++) {\n        for (int j = 0; j < 4; j++) {\n            cout << matrix[i][j] << "\\t";\n        }\n        cout << endl;\n    }\n    return 0;\n}`} caption="อาร์เรย์ 2 มิติ — ใช้เก็บตาราง/เมทริกซ์" />
		<Callout type="tip" label="เพิ่มเติม">
			<p>matrix[n][m] ใช้บ่อยใน grid problems</p>
		</Callout>
	</div>
</ContentSection>

<ContentSection id="sec-7-4">
	<SectionHeading num="7.4" title="การรวมกลุ่มข้อมูลด้วยอาร์เรย์" />
	<div class="section-body">
		<p>ใช้ array รวมข้อมูลที่เกี่ยวข้องกัน เช่น คะแนนสอบของนักศึกษา</p>
		<CodeBlock lang="cpp" caption="เก็บคะแนน n คน แล้วหาค่าเฉลี่ย" code={`#include <iostream>
using namespace std;

int main() {
    const int MAX = 100;
    int scores[MAX];
    int n;

    cin >> n;  // จำนวนนักเรียน
    for (int i = 0; i < n; i++) {
        cin >> scores[i];
    }

    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += scores[i];
    }
    cout << "Average: " << (double)sum / n << endl;
    return 0;
}`} />
		<IOExample input={`3\n80 90 70`} output="Average: 80" />
	</div>
</ContentSection>

<ContentSection id="sec-7-5">
	<SectionHeading num="7.5" title="ตัวอย่างการแก้ปัญหาด้วยอาร์เรย์" />
	<div class="section-body">
		<h3 class="sub-heading">โจทย์: หาค่ามากที่สุดและน้อยที่สุด</h3>
		<CodeBlock lang="cpp" code={`#include <iostream>
using namespace std;

int main() {
    int arr[] = {3, 7, 2, 9, 1, 5};
    int n = 6;

    int maxVal = arr[0], minVal = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > maxVal) maxVal = arr[i];
        if (arr[i] < minVal) minVal = arr[i];
    }

    cout << "Max: " << maxVal << endl;  // 9
    cout << "Min: " << minVal << endl;  // 1
    return 0;
}`} />
	</div>
</ContentSection>

<!-- ===== บทที่ 8 ===== -->
<ChapterDivider num={8} title={chapters[7].title} />

<ContentSection id="sec-8-1">
	<SectionHeading num="8.1" title="แนวคิดและการประกาศฟังก์ชัน" />
	<div class="section-body">
		<p>ฟังก์ชัน (function) แยกโปรแกรมเป็นส่วนย่อย ใช้ซ้ำได้ อ่านและทดสอบง่าย</p>
		<CodeBlock lang="cpp" caption="ฟังก์ชันคำนวณกำลังสอง" code={`#include <iostream>
using namespace std;

int square(int x) {
    return x * x;
}

int main() {
    cout << square(5) << endl;   // 25
    cout << square(10) << endl;  // 100
    return 0;
}`} />
	</div>
</ContentSection>

<ContentSection id="sec-8-2">
	<SectionHeading num="8.2" title="การคืนค่าผ่านฟังก์ชัน" />
	<div class="section-body">
		<p><code>return</code> ส่งค่ากลับ · ฟังก์ชัน <code>void</code> ไม่คืนค่า</p>
		<CodeBlock lang="cpp" code={`#include <iostream>
using namespace std;

int maxOfTwo(int a, int b) {
    if (a > b) return a;
    return b;
}

void printStars(int n) {
    for (int i = 0; i < n; i++) cout << "*";
    cout << endl;
}

int main() {
    cout << maxOfTwo(7, 3) << endl;  // 7
    printStars(5);                   // *****
    return 0;
}`} />
	</div>
</ContentSection>

<ContentSection id="sec-8-3">
	<SectionHeading num="8.3" title="พารามิเตอร์และการส่งค่า" />
	<div class="section-body">
		<p>C++ ส่ง parameter แบบ pass-by-value โดย default — ใช้ reference (<code>&amp;</code>) เมื่อต้องการแก้ค่าต้นฉบับ</p>
		<DataTable>
			<thead>
				<tr><th>วิธี</th><th>Syntax</th><th>ผล</th></tr>
			</thead>
			<tbody>
				<tr><td>Pass by value</td><td><code>void f(int x)</code></td><td>ได้ copy — แก้ x ไม่กระทบต้นฉบับ</td></tr>
				<tr><td>Pass by reference</td><td><code>void f(int &amp;x)</code></td><td>แก้ x กระทบตัวแปรจริง</td></tr>
				<tr><td>Pass by const ref</td><td><code>void f(const int &amp;x)</code></td><td>อ่านอย่างเดียว ไม่ copy</td></tr>
			</tbody>
		</DataTable>
		<CodeBlock lang="cpp" caption="swap ด้วย reference" code={`#include <iostream>
using namespace std;

void swapValues(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 1, y = 2;
    swapValues(x, y);
    cout << x << " " << y << endl;  // 2 1
    return 0;
}`} />
	</div>
</ContentSection>

<ContentSection id="sec-8-4">
	<SectionHeading num="8.4" title="ขอบเขตของตัวแปร (Scope)" />
	<div class="section-body">
		<p>Scope คือขอบเขตที่ตัวแปรใช้ได้ — ตัวแปรใน block <code>{'{ }'}</code> ใช้ได้เฉพาะใน block นั้น</p>
		<CodeBlock lang="cpp" code={`#include <iostream>
using namespace std;

int main() {
    int x = 10;

    if (true) {
        int y = 20;
        cout << x + y << endl;  // OK: 30
    }
    // cout << y;  // ERROR: y ไม่อยู่ใน scope

    return 0;
}`} />
	</div>
</ContentSection>

<ContentSection id="sec-8-5">
	<SectionHeading num="8.5" title="Global และ Local Variable" />
	<div class="section-body">
		<p><strong>Global</strong> ประกาศนอกฟังก์ชัน · <strong>Local</strong> ประกาศในฟังก์ชัน/block</p>
		<CodeBlock lang="cpp" code={`#include <iostream>
using namespace std;

int globalCounter = 0;  // global — ใช้ได้ทั้งไฟล์

void increment() {
    int localStep = 1;       // local — ใช้ได้ใน increment() เท่านั้น
    globalCounter += localStep;
}

int main() {
    increment();
    increment();
    cout << globalCounter << endl;  // 2
    return 0;
}`} />
		<Callout type="warning">
			<p>ใช้ global น้อยที่สุด — ทำให้ debug ยากและเกิด side effect</p>
		</Callout>
	</div>
</ContentSection>

<!-- ===== บทที่ 9 ===== -->
<ChapterDivider num={9} title={chapters[8].title} />

<ContentSection id="sec-9-1">
	<SectionHeading num="9.1" title="แนวคิดของ Recursion" />
	<div class="section-body">
		<p>Recursion คือฟังก์ชันเรียกตัวเอง เพื่อแก้ปัญหาย่อยที่เล็กลง — ต้องมี <strong>base case</strong> เป็นจุดหยุด</p>
		<Callout type="definition">
			<p><strong>Recursion</strong> — เทคนิคที่ฟังก์ชันเรียกตัวเอง โดยปัญหาใหญ่ถูกแตกเป็นปัญหาย่อยชนิดเดียวกัน</p>
		</Callout>
		<p>ตัวอย่างในชีวิตจริง: ดูโดมในโดม (ภาพซ้อนภาพ) — แต่ละชั้นเหมือนชั้นใหญ่ แต่เล็กลง</p>
	</div>
</ContentSection>

<ContentSection id="sec-9-2">
	<SectionHeading num="9.2" title="Base Case และ Recursive Case" />
	<div class="section-body">
		<CodeBlock lang="cpp" caption="ผลรวม 1 ถึง n ด้วย recursion" code={`#include <iostream>
using namespace std;

int sum(int n) {
    if (n <= 0) return 0;        // base case: หยุด
    return n + sum(n - 1);       // recursive case
}

int main() {
    cout << sum(5) << endl;  // 15 (= 5+4+3+2+1)
    return 0;
}`} />
		<p>การทำงาน: sum(5) → 5 + sum(4) → 5 + 4 + sum(3) → ... → 5 + 4 + 3 + 2 + 1 + 0</p>
	</div>
</ContentSection>

<ContentSection id="sec-9-3">
	<SectionHeading num="9.3" title="ตัวอย่าง: Factorial และ Fibonacci" />
	<div class="section-body">
		<h3 class="sub-heading">Factorial</h3>
		<CodeBlock lang="cpp" code={`long long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
// factorial(5) = 5*4*3*2*1 = 120`} />
		<h3 class="sub-heading">Fibonacci</h3>
		<CodeBlock lang="cpp" code={`#include <iostream>
using namespace std;

int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

int main() {
    for (int i = 0; i < 10; i++)
        cout << fib(i) << " ";
    cout << endl;  // 0 1 1 2 3 5 8 13 21 34
    return 0;
}`} />
		<div style="display:flex;justify-content:center;margin:16px 0">
			<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*svQ784qk1hvBE3iz7VGGgQ.jpeg" alt="Fibonacci Diagram" style="width:90%;max-width:640px;border-radius:8px" />
		</div>
		<p style="text-align:center;font-size:13px;color:var(--color-ink-muted)">Fibonacci Diagram</p>
	</div>
</ContentSection>

<ContentSection id="sec-9-4">
	<SectionHeading num="9.4" title="ข้อควรระวังเมื่อใช้ Recursion" />
	<div class="section-body">
		<ul>
			<li>ต้องมี base case ชัดเจน — ไม่งั้น stack overflow</li>
			<li>Recursion ลึกเกินไปช้า — ใช้ loop หรือ memoization</li>
			<li>Fibonacci naive เป็น O(2ⁿ) — ในการเขียนโปรแกรมเชิงแข่งขันใช้ loop O(n) หรือ DP</li>
		</ul>
	</div>
</ContentSection>

<!-- ===== บทที่ 10 ===== -->
<ChapterDivider num={10} title={chapters[9].title} />

<ContentSection id="sec-10-1">
	<SectionHeading num="10.1" title="ที่อยู่ในหน่วยความจำและพอยน์เตอร์" />
	<div class="section-body">
		<p>ตัวแปรทุกตัวมี address ในหน่วยความจำ พอยน์เตอร์เก็บ address นั้น</p>
		<CodeBlock lang="cpp" code={`#include <iostream>
using namespace std;

int main() {
    int x = 42;
    cout << "Value:   " << x << endl;
    cout << "Address: " << &x << endl;  // & = หา address
    return 0;
}`} />
	</div>
</ContentSection>

<ContentSection id="sec-10-2">
	<SectionHeading num="10.2" title="การประกาศและใช้งานพอยน์เตอร์" />
	<div class="section-body">
		<CodeBlock lang="cpp" caption="ประกาศ pointer, dereference, เปลี่ยนค่า" code={`#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int* ptr = &x;       // ptr เก็บ address ของ x

    cout << *ptr << endl;  // 10  (* = dereference อ่านค่า)
    *ptr = 20;             // เปลี่ยนค่า x ผ่าน pointer
    cout << x << endl;     // 20

    return 0;
}`} />
		<DataTable>
			<thead>
				<tr><th>สัญลักษณ์</th><th>ชื่อ</th><th>ความหมาย</th></tr>
			</thead>
			<tbody>
				<tr><td><code>&amp;</code></td><td>Address-of</td><td>หา address ของตัวแปร</td></tr>
				<tr><td><code>*</code></td><td>Dereference</td><td>อ่าน/เขียนค่าที่ address</td></tr>
			</tbody>
		</DataTable>
	</div>
</ContentSection>

<ContentSection id="sec-10-3">
	<SectionHeading num="10.3" title="พอยน์เตอร์กับอาร์เรย์" />
	<div class="section-body">
		<p>ชื่อ array แปลว่า pointer ไป element แรก — <code>arr[i]</code> เทียบเท่า <code>*(arr + i)</code></p>
		<CodeBlock lang="cpp" code={`#include <iostream>
using namespace std;

int main() {
    int arr[] = {10, 20, 30};
    int* p = arr;

    cout << arr[1] << endl;    // 20
    cout << *(p + 1) << endl;  // 20 (เทียบเท่า)
    cout << p[2] << endl;      // 30

    return 0;
}`} />
	</div>
</ContentSection>

<ContentSection id="sec-10-4">
	<SectionHeading num="10.4" title="พอยน์เตอร์กับฟังก์ชัน" />
	<div class="section-body">
		<CodeBlock lang="cpp" caption="ส่ง pointer ให้ฟังก์ชันแก้ค่า" code={`#include <iostream>
using namespace std;

void increment(int* p) {
    (*p)++;  // เปลี่ยนค่าที่ pointer ชี้
}

int main() {
    int n = 5;
    increment(&n);
    cout << n << endl;  // 6
    return 0;
}`} />
		<Callout type="note">
			<p>ในทางปฏิบัติ ใช้ reference (<code>int&amp;</code>) มากกว่า pointer สำหรับ pass-by-reference</p>
		</Callout>
	</div>
</ContentSection>

<!-- ===== บทที่ 11 ===== -->
<ChapterDivider num={11} title={chapters[10].title} />

<ContentSection id="sec-11-1">
	<SectionHeading num="11.1" title="struct ใน C++" />
	<div class="section-body">
		<p>struct รวมข้อมูลหลาย field เป็นชนิดข้อมูลใหม่</p>
		<CodeBlock lang="cpp" caption="struct เก็บพิกัด 2 มิติ" code={`#include <iostream>
using namespace std;

struct Point {
    int x;
    int y;
};

int main() {
    Point p = {3, 4};
    cout << "(" << p.x << ", " << p.y << ")" << endl; // (3, 4)
    return 0;
}`} />
	</div>
</ContentSection>

<ContentSection id="sec-11-2">
	<SectionHeading num="11.2" title="class และการเข้าถึง (access specifier)" />
	<div class="section-body">
		<p>class คล้าย struct แต่ default เป็น private — ใช้ public/private ควบคุมการเข้าถึง</p>
		<CodeBlock lang="cpp" caption="การสร้าง Class และการกำหนดสิทธิ์การเข้าถึงสมาชิก (public และ private)" code={`#include <iostream>
#include <string>
using namespace std;

class Student {
public:
    string name;
    int score;

    void display() {
        cout << name << ": " << score << endl;
    }
private:
    int studentId;  // ซ่อนจากภายนอก
};

int main() {
    Student s;
    s.name = "Somchai";
    s.score = 85;
    s.display();
    return 0;
}`} />
		<IOExample input="" output="Somchai: 85" />
	</div>
</ContentSection>

<ContentSection id="sec-11-3">
	<SectionHeading num="11.3" title="Constructor และ Destructor" />
	<div class="section-body">
		<CodeBlock lang="cpp" caption="Constructor กำหนดค่าเริ่มต้น" code={`#include <iostream>
using namespace std;

class Rectangle {
    int width, height;
public:
    // Constructor — เรียกอัตโนมัติเมื่อสร้าง object
    Rectangle(int w, int h) : width(w), height(h) {}

    int area() const { return width * height; }
};

int main() {
    Rectangle r(5, 3);
    cout << "Area: " << r.area() << endl;  // 15
    return 0;
}`} />
	</div>
</ContentSection>

<ContentSection id="sec-11-4">
	<SectionHeading num="11.4" title="Method และสมาชิกของ class" />
	<div class="section-body">
		<CodeBlock lang="cpp" caption="Method จัดการ state ของ object" code={`#include <iostream>
using namespace std;

class Counter {
    int value = 0;
public:
    void increment() { value++; }
    void reset()     { value = 0; }
    int getValue() const { return value; }
};

int main() {
    Counter c;
    c.increment();
    c.increment();
    cout << c.getValue() << endl;  // 2
    return 0;
}`} />
	</div>
</ContentSection>

<!-- ===== บทที่ 12 ===== -->
<ChapterDivider num={12} title={chapters[11].title} />

<ContentSection id="sec-12-1">
	<SectionHeading num="12.1" title="การเรียงข้อมูล (Sorting)" />
	<div class="section-body">
		<p>การเรียง (sorting) จัดลำดับข้อมูล — ใน C++ ใช้ <code>std::sort</code> จาก algorithm</p>
		<CodeBlock lang="cpp" caption="std::sort — O(n log n)" code={`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 2, 8, 1, 9};
    sort(v.begin(), v.end());

    for (int x : v) cout << x << " ";
    cout << endl;  // 1 2 5 8 9
    return 0;
}`} />
		<Callout type="tip">
			<p>ใช้ std::sort เป็นค่า default — เร็วและ implement ดี (Introsort)</p>
		</Callout>
	</div>
</ContentSection>

<ContentSection id="sec-12-2">
	<SectionHeading num="12.2" title="Bubble Sort, Selection Sort และ Insertion Sort" />
	<div class="section-body">
		<h3 class="sub-heading">Bubble Sort — O(n²)</h3>
		<CodeBlock lang="cpp" caption="Bubble Sort" code={`void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`} />
		<div style="display:flex;justify-content:center;margin:12px 0">
			<img src="https://upload.wikimedia.org/wikipedia/commons/5/54/Sorting_bubblesort_anim.gif" alt="Bubble Sort animation" style="width:50%;border-radius:8px" />
		</div>
		<p>Bubble Sort สลับคู่ที่ adjacent จนเรียงครบ — เข้าใจง่าย แต่ช้า</p>
		<h3 class="sub-heading">Selection Sort — O(n²)</h3>
		<CodeBlock lang="cpp" caption="Selection Sort" code={`void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        swap(arr[i], arr[min_idx]);
    }
}`} />
		<div style="display:flex;justify-content:center;margin:12px 0">
			<img src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Sorting_selection_sort_anim.gif" alt="Selection Sort animation" style="width:50%;border-radius:8px" />
		</div>
		<p>Selection Sort เลือกค่าน้อยที่สุดจากส่วนที่ยังไม่เรียง แล้วสลับมาไว้ด้านหน้า</p>
		<h3 class="sub-heading">Insertion Sort — O(n²)</h3>
		<CodeBlock lang="cpp" caption="Insertion Sort" code={`void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; ++i) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`} />
		<div style="display:flex;justify-content:center;margin:12px 0">
			<img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Sorting_insertion_sort_anim.gif" alt="Insertion Sort animation" style="width:50%;border-radius:8px" />
		</div>
		<p>Insertion Sort แทรกสมาชิกแต่ละตัวเข้าไปในตำแหน่งที่ถูกต้องของส่วนที่เรียงแล้ว</p>
	</div>
</ContentSection>

<ContentSection id="sec-12-3">
	<SectionHeading num="12.3" title="การค้นหาแบบ Linear Search" />
	<div class="section-body">
		<CodeBlock lang="cpp" caption="Linear Search — O(n)" code={`int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;  // ไม่พบ
}`} />
		<div style="display:flex;justify-content:center;margin:12px 0">
			<img src="https://sushrutkuchik.wordpress.com/wp-content/uploads/2020/05/linear_search.gif" alt="Linear Search" style="width:50%;border-radius:8px" />
		</div>
		<p>ใช้ได้ทั้งข้อมูลเรียงและไม่เรียง</p>
	</div>
</ContentSection>

<ContentSection id="sec-12-4">
	<SectionHeading num="12.4" title="การค้นหาแบบ Binary Search" />
	<div class="section-body">
		<p>Binary Search ใช้ได้เมื่อข้อมูล<strong>เรียงแล้ว</strong> — แบ่งครึ่งทุกครั้ง O(log n)</p>
		<CodeBlock lang="cpp" caption="Binary Search — O(log n)" code={`#include <iostream>
using namespace std;

int binarySearch(int arr[], int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;  // ป้องกัน overflow
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) lo = mid + 1;
        else                   hi = mid - 1;
    }
    return -1;
}

int main() {
    int arr[] = {1, 3, 5, 7, 9, 11};
    cout << binarySearch(arr, 6, 7) << endl;  // 3
    return 0;
}`} />
		<div style="display:flex;justify-content:center;margin:12px 0">
			<img src="https://sushrutkuchik.wordpress.com/wp-content/uploads/2020/05/bepceumnsg-binary_search_gif.gif" alt="Binary Search" style="width:50%;border-radius:8px" />
		</div>
	</div>
</ContentSection>

<!-- ===== บทที่ 13 ===== -->
<ChapterDivider num={13} title={chapters[12].title} />

<ContentSection id="sec-13-1">
	<SectionHeading num="13.1" title="C-style string และ std::string" />
	<div class="section-body">
		<p><code>char[]</code> เป็น C-style string ลงท้าย <code>\0</code> · <code>std::string</code> ใช้งานสะดวกกว่า</p>
		<CodeBlock lang="cpp" code={`#include <iostream>
#include <string>
using namespace std;

int main() {
    char cstr[] = "Hello";       // C-style
    string s = "Hello";          // C++ string

    cout << cstr << endl;
    cout << s.length() << endl;  // 5
    return 0;
}`} />
		<Callout type="tip">
			<p>ใช้ std::string เป็นหลัก — ไม่ต้องกังวล buffer overflow</p>
		</Callout>
	</div>
</ContentSection>

<ContentSection id="sec-13-2">
	<SectionHeading num="13.2" title="การอ่านและเขียนสตริง" />
	<div class="section-body">
		<CodeBlock lang="cpp" caption="getline อ่านชื่อที่มี space ได้" code={`#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    cout << "Enter name: ";
    getline(cin, name);  // อ่านทั้งบรรทัด รวม space

    cout << "Hello, " << name << "!" << endl;
    return 0;
}`} />
		<Callout type="warning">
			<p>ถ้า <code>cin &gt;&gt;</code> มาก่อน getline ต้อง <code>cin.ignore()</code> เพื่อล้าง newline ค้าง</p>
		</Callout>
	</div>
</ContentSection>

<ContentSection id="sec-13-3">
	<SectionHeading num="13.3" title="การจัดการสตริงใน C++" />
	<div class="section-body">
		<CodeBlock lang="cpp" caption="ฟังก์ชัน string ที่ใช้บ่อย" code={`#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello";

    s += " World";              // ต่อ string
    cout << s << endl;          // Hello World
    cout << s.substr(0, 5) << endl;  // Hello
    cout << s.find("World") << endl; // 6
    cout << s.size() << endl;        // 11

    return 0;
}`} />
	</div>
</ContentSection>

<ContentSection id="sec-13-4">
	<SectionHeading num="13.4" title="ตัวอย่างการใช้งานสตริง" />
	<div class="section-body">
		<h3 class="sub-heading">โจทย์: นับจำนวนคำในประโยค</h3>
		<CodeBlock lang="cpp" code={`#include <iostream>
#include <string>
using namespace std;

int main() {
    string line;
    getline(cin, line);

    int wordCount = 0;
    bool inWord = false;

    for (char c : line) {
        if (c != ' ' && !inWord) {
            wordCount++;
            inWord = true;
        }
        if (c == ' ') inWord = false;
    }

    cout << wordCount << endl;
    return 0;
}`} />
		<IOExample input="hello world foo" output="3" />
	</div>
</ContentSection>

<!-- ===== บทที่ 14 ===== -->
<ChapterDivider num={14} title={chapters[13].title} />

<ContentSection id="sec-14-1">
	<SectionHeading num="14.1" title="แนวคิดของ Linked List" />
	<div class="section-body">
		<p>Linked List เป็นโครงสร้างข้อมูลเชิงเส้นที่เก็บข้อมูลเป็นชุดของ <strong>node</strong> แต่ละ node จะเชื่อมต่อกับ node ถัดไปด้วย pointer ทำให้ข้อมูลไม่จำเป็นต้องจัดเก็บแบบต่อเนื่องในหน่วยความจำ</p>
		<Callout type="definition">
			<p><strong>Linked List</strong> — โครงสร้างข้อมูลแบบเชื่อมโยง โดยข้อมูลแต่ละตัวถูกเก็บใน node พร้อม pointer ชี้ไปยัง node ต่อไป</p>
		</Callout>
		<DataTable>
			<thead>
				<tr><th></th><th>Array</th><th>Linked List</th></tr>
			</thead>
			<tbody>
				<tr><td>จัดเก็บในหน่วยความจำ</td><td>จัดเรียงต่อเนื่อง</td><td>กระจายตามหน่วยความจำ</td></tr>
				<tr><td>ขนาด</td><td>คงที่ หรือขยายโดยคัดลอก</td><td>ปรับขนาดได้ตาม runtime</td></tr>
				<tr><td>เข้าถึงตำแหน่งเฉพาะ</td><td>O(1)</td><td>O(n)</td></tr>
				<tr><td>แทรก/ลบที่ต้นรายการ</td><td>O(n)</td><td>O(1)</td></tr>
			</tbody>
		</DataTable>
		<p>โครงสร้างของ node ประกอบด้วย <strong>data</strong> เก็บค่า และ <strong>next</strong> ชี้ไปยัง node ถัดไป รายการเริ่มจาก pointer <strong>head</strong> และ node สุดท้ายชี้ไปยัง <code>nullptr</code></p>
	</div>
</ContentSection>

<ContentSection id="sec-14-2">
	<SectionHeading num="14.2" title="Singly Linked List" />
	<div class="section-body">
		<p>Singly Linked List เป็น linked list แบบพื้นฐาน แต่ละ node มี pointer ชี้ไปยัง node ถัดไปเท่านั้น</p>
		<CodeBlock lang="cpp" caption="Singly Linked List — รวมฟังก์ชันพื้นฐาน" code={`#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

Node* createNode(int value) {
    return new Node{value, nullptr};
}

void pushFront(Node*& head, int value) {
    Node* newNode = createNode(value);
    newNode->next = head;
    head = newNode;
}

void pushBack(Node*& head, int value) {
    Node* newNode = createNode(value);
    if (head == nullptr) { head = newNode; return; }
    Node* p = head;
    while (p->next != nullptr) p = p->next;
    p->next = newNode;
}

void insertAfter(Node* prev, int value) {
    if (prev == nullptr) return;
    Node* newNode = createNode(value);
    newNode->next = prev->next;
    prev->next = newNode;
}

void deleteNode(Node*& head, int value) {
    while (head != nullptr && head->data == value) {
        Node* temp = head;
        head = head->next;
        delete temp;
    }
    Node* p = head;
    while (p != nullptr && p->next != nullptr) {
        if (p->next->data == value) {
            Node* temp = p->next;
            p->next = p->next->next;
            delete temp;
        } else { p = p->next; }
    }
}

void printList(Node* head) {
    for (Node* p = head; p != nullptr; p = p->next) {
        cout << p->data;
        if (p->next != nullptr) cout << " -> ";
    }
    cout << "\n";
}

int main() {
    Node* head = nullptr;
    pushBack(head, 10);
    pushBack(head, 20);
    pushFront(head, 5);
    insertAfter(head->next, 15);
    printList(head);       // 5 -> 10 -> 15 -> 20
    deleteNode(head, 10);
    printList(head);       // 5 -> 15 -> 20
    return 0;
}`} />
	</div>
</ContentSection>

<ContentSection id="sec-14-3">
	<SectionHeading num="14.3" title="Doubly Linked List" />
	<div class="section-body">
		<p>Doubly Linked List แต่ละ node เก็บ pointer สองตัว: <code>prev</code> และ <code>next</code> — เดินทางได้ทั้งไปข้างหน้าและย้อนกลับ</p>
		<CodeBlock lang="cpp" caption="Doubly Linked List — ฟังก์ชันเพิ่ม ลบ และพิมพ์" code={`#include <iostream>
using namespace std;

struct DNode {
    int data;
    DNode* prev;
    DNode* next;
};

DNode* createDNode(int value) {
    return new DNode{value, nullptr, nullptr};
}

void pushFront(DNode*& head, int value) {
    DNode* node = createDNode(value);
    node->next = head;
    if (head != nullptr) head->prev = node;
    head = node;
}

void pushBack(DNode*& head, int value) {
    DNode* node = createDNode(value);
    if (head == nullptr) { head = node; return; }
    DNode* p = head;
    while (p->next != nullptr) p = p->next;
    p->next = node;
    node->prev = p;
}

void deleteNode(DNode*& head, DNode* target) {
    if (head == nullptr || target == nullptr) return;
    if (head == target) {
        head = head->next;
        if (head != nullptr) head->prev = nullptr;
        delete target;
        return;
    }
    if (target->prev != nullptr) target->prev->next = target->next;
    if (target->next != nullptr) target->next->prev = target->prev;
    delete target;
}

void printForward(DNode* head) {
    for (DNode* p = head; p != nullptr; p = p->next) {
        cout << p->data;
        if (p->next != nullptr) cout << " <-> ";
    }
    cout << "\n";
}

int main() {
    DNode* head = nullptr;
    pushBack(head, 10);
    pushBack(head, 20);
    pushFront(head, 5);
    printForward(head);          // 5 <-> 10 <-> 20
    deleteNode(head, head->next);
    printForward(head);          // 5 <-> 20
    return 0;
}`} />
	</div>
</ContentSection>

<ContentSection id="sec-14-4">
	<SectionHeading num="14.4" title="Circular Linked List" />
	<div class="section-body">
		<p>Circular Linked List node สุดท้ายชี้กลับไปยัง node แรก — เหมาะกับงานที่ต้องวนรอบข้อมูลเป็นลูป เช่น playlist, scheduler</p>
		<CodeBlock lang="cpp" caption="Circular Linked List — ฟังก์ชันพื้นฐาน" code={`#include <iostream>
using namespace std;

struct CNode {
    int data;
    CNode* next;
};

void pushBack(CNode*& tail, int value) {
    CNode* node = new CNode{value, nullptr};
    if (tail == nullptr) {
        node->next = node;
        tail = node;
        return;
    }
    node->next = tail->next;
    tail->next = node;
    tail = node;
}

void printCircular(CNode* tail) {
    if (tail == nullptr) return;
    CNode* head = tail->next;
    CNode* p = head;
    do {
        cout << p->data;
        p = p->next;
        if (p != head) cout << " -> ";
    } while (p != head);
    cout << "\n";
}

int main() {
    CNode* tail = nullptr;
    pushBack(tail, 10);
    pushBack(tail, 20);
    pushBack(tail, 30);
    printCircular(tail);  // 10 -> 20 -> 30
    return 0;
}`} />
	</div>
</ContentSection>

<ContentSection id="sec-14-5">
	<SectionHeading num="14.5" title="ตัวอย่างการใช้งาน Linked List" />
	<div class="section-body">
		<p>Linked list ใช้ในงานที่ต้องการโครงสร้างยืดหยุ่น เช่น adjacency list สำหรับกราฟ, undo/redo ใน text editor, หรือเป็นฐานของ stack และ queue</p>
		<ul>
			<li>เก็บรายการเพลง (playlist) ที่เพิ่ม/ลบบ่อย</li>
			<li>adjacency list สำหรับกราฟ sparse</li>
			<li>undo/redo ใน text editor</li>
			<li>สร้าง stack หรือ queue แบบ dynamic</li>
		</ul>
		<Callout type="tip" label="เพิ่มเติม">
			<p>ถ้าต้องเข้าถึงตำแหน่งบ่อย ๆ หรือข้อมูลขนาดคงที่ array/vector จะดีกว่า แต่ linked list เหนือกว่าเมื่อต้องแก้ไขตำแหน่งบ่อย</p>
		</Callout>
	</div>
</ContentSection>

<!-- ===== บทที่ 15 ===== -->
<ChapterDivider num={15} title={chapters[14].title} />

<ContentSection id="sec-15-1">
	<SectionHeading num="15.1" title="แนวคิดของ Stack (LIFO)" />
	<div class="section-body">
		<p>Stack เป็นโครงสร้างข้อมูลแบบ LIFO (Last In, First Out) — ข้อมูลที่ใส่เข้ามาล่าสุดจะถูกเอาออกก่อนเสมอ</p>
		<Callout type="definition">
			<p><strong>Stack</strong> — โครงสร้างที่รองรับ push (ใส่), pop (เอาออก), top (ดูตัวบนสุด)</p>
		</Callout>
		<p>ตัวอย่างในชีวิตจริง: จานซ้อนกัน — ใส่หรือหยิบได้เฉพาะจานด้านบนสุด</p>
		<ul>
			<li>Stack ช่วยให้ย้อนกลับสถานะได้ง่าย เช่น undo/redo</li>
			<li>ใช้เก็บข้อมูลระหว่างการทำ recursion และ DFS</li>
			<li>ใช้ตรวจสอบวงเล็บสมดุลและประมวลผลนิพจน์คณิตศาสตร์</li>
		</ul>
	</div>
</ContentSection>

<ContentSection id="sec-15-2">
	<SectionHeading num="15.2" title="การ Implement Stack ด้วยอาร์เรย์" />
	<div class="section-body">
		<CodeBlock lang="cpp" caption="Stack ด้วย array" code={`#include <iostream>
using namespace std;

const int MAXN = 1000;
int stackArr[MAXN];
int topIndex = -1;

void push(int value) { stackArr[++topIndex] = value; }
int  pop()           { return stackArr[topIndex--]; }
int  peek()          { return stackArr[topIndex]; }
bool isEmpty()       { return topIndex < 0; }

int main() {
    push(10); push(20); push(30);
    cout << peek() << endl;  // 30
    cout << pop()  << endl;  // 30
    cout << pop()  << endl;  // 20
    return 0;
}`} />
		<Callout type="note" label="คำเตือน">
			<p>สแตกแบบ array มีขนาดคงที่ หากใส่เกินขนาดจะเกิด overflow และต้องเช็คว่าไม่ดึงออกจาก stack ว่าง</p>
		</Callout>
	</div>
</ContentSection>

<ContentSection id="sec-15-3">
	<SectionHeading num="15.3" title="การ Implement Stack ด้วย Linked List" />
	<div class="section-body">
		<CodeBlock lang="cpp" caption="Stack ด้วย linked list" code={`struct StackNode {
    int data;
    StackNode* next;
};

void pushNode(StackNode*& top, int value) {
    StackNode* node = new StackNode{value, top};
    top = node;
}

int popNode(StackNode*& top) {
    int value = top->data;
    StackNode* temp = top;
    top = top->next;
    delete temp;
    return value;
}`} />
		<Callout type="tip" label="เพิ่มเติม">
			<p>Stack ด้วย linked list ทำให้ push และ pop เป็น O(1) ตราบใดที่ชี้ top อยู่เสมอ</p>
		</Callout>
	</div>
</ContentSection>

<ContentSection id="sec-15-4">
	<SectionHeading num="15.4" title="std::stack ใน STL" />
	<div class="section-body">
		<CodeBlock lang="cpp" caption="std::stack — ตรวจวงเล็บสมดุล" code={`#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isBalanced(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{')
            st.push(c);
        else if (c == ')' || c == ']' || c == '}') {
            if (st.empty()) return false;
            st.pop();
        }
    }
    return st.empty();
}

int main() {
    cout << isBalanced("({[]})") << endl;  // 1 (true)
    cout << isBalanced("([)]")   << endl;  // 0 (false)
    return 0;
}`} />
		<Callout type="tip" label="เพิ่มเติม">
			<p>std::stack ใช้บ่อยใน DFS, bracket matching, monotonic stack</p>
		</Callout>
	</div>
</ContentSection>

<!-- ===== บทที่ 16 ===== -->
<ChapterDivider num={16} title={chapters[15].title} />

<ContentSection id="sec-16-1">
	<SectionHeading num="16.1" title="แนวคิดของ Queue (FIFO)" />
	<div class="section-body">
		<p>Queue เป็นโครงสร้างข้อมูลแบบ FIFO (First In, First Out) — ข้อมูลที่เข้ามาก่อนจะออกก่อน</p>
		<Callout type="definition">
			<p><strong>Queue</strong> — โครงสร้างที่รองรับ enqueue (ใส่ท้าย), dequeue (เอาหัว), front (ดูตัวหน้า)</p>
		</Callout>
		<ul>
			<li>ใช้ใน BFS เพื่อเยี่ยมชมโหนดตามลำดับระดับ</li>
			<li>ใช้ในระบบคิว, scheduling และ simulation</li>
			<li>ใช้เป็น buffer หรือคิวรอคำสั่งที่เข้ามา</li>
		</ul>
	</div>
</ContentSection>

<ContentSection id="sec-16-2">
	<SectionHeading num="16.2" title="การ Implement Queue ด้วยอาร์เรย์" />
	<div class="section-body">
		<CodeBlock lang="cpp" caption="Queue ด้วย array (simple version)" code={`#include <iostream>
using namespace std;

const int MAXN = 1000;
int queueArr[MAXN];
int frontIndex = 0, rearIndex = -1;

void enqueue(int value)  { queueArr[++rearIndex] = value; }
int  dequeue()           { return queueArr[frontIndex++]; }
bool isQueueEmpty()      { return frontIndex > rearIndex; }

int main() {
    enqueue(1); enqueue(2); enqueue(3);
    cout << dequeue() << endl;  // 1
    cout << dequeue() << endl;  // 2
    return 0;
}`} />
		<Callout type="note">
			<p>Version นี้ง่ายแต่ไม่รีไซเคิลพื้นที่ มักใช้ circular queue เพื่อใช้งาน array ให้เต็มที่</p>
		</Callout>
	</div>
</ContentSection>

<ContentSection id="sec-16-3">
	<SectionHeading num="16.3" title="การ Implement Queue ด้วย Linked List" />
	<div class="section-body">
		<CodeBlock lang="cpp" caption="Queue ด้วย linked list" code={`struct QueueNode {
    int data;
    QueueNode* next;
};

struct Queue {
    QueueNode *front = nullptr, *rear = nullptr;

    void enqueue(int value) {
        QueueNode* node = new QueueNode{value, nullptr};
        if (rear == nullptr) {
            front = rear = node;
        } else {
            rear->next = node;
            rear = node;
        }
    }

    int dequeue() {
        int value = front->data;
        QueueNode* temp = front;
        front = front->next;
        if (front == nullptr) rear = nullptr;
        delete temp;
        return value;
    }
};`} />
	</div>
</ContentSection>

<ContentSection id="sec-16-4">
	<SectionHeading num="16.4" title="std::queue ใน STL" />
	<div class="section-body">
		<CodeBlock lang="cpp" caption="std::queue ใน STL" code={`#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    q.push(10);
    q.push(20);
    q.push(30);

    cout << q.front() << endl;  // 10 (ตัวแรกที่เข้า)
    q.pop();
    cout << q.front() << endl;  // 20

    return 0;
}`} />
		<p>std::queue ใช้ใน BFS บน graph/grid — เป็นหัวใจของการค้นหาแบบกว้าง</p>
	</div>
</ContentSection>
