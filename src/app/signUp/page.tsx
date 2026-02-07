"use client";

import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input, Button, Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name
        });
      }

      router.push("/"); // Redirect to home after signup
    } catch (err: any) {
      console.error(err);
      setError("เกิดข้อผิดพลาดในการสมัครสมาชิก: " + (err.message || "โปรดตรวจสอบข้อมูลอีกครั้ง"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="flex flex-col gap-1 items-center">
          <h1 className="text-2xl font-bold text-[#2F5D86]">สมัครสมาชิก Peace Play</h1>
          <p className="text-sm text-gray-500">สร้างบัญชีเพื่อเริ่มต้นใช้งาน</p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <Input
              type="text"
              label="ชื่อผู้ใช้"
              placeholder="กรอกชื่อของคุณ"
              value={name}
              onValueChange={setName}
              required
              variant="bordered"
            />
            <Input
              type="email"
              label="อีเมล"
              placeholder="กรอกอีเมลของคุณ"
              value={email}
              onValueChange={setEmail}
              required
              variant="bordered"
            />
            <Input
              type="password"
              label="รหัสผ่าน"
              placeholder="กำหนดรหัสผ่าน"
              value={password}
              onValueChange={setPassword}
              required
              variant="bordered"
            />
            <Input
              type="password"
              label="ยืนยันรหัสผ่าน"
              placeholder="กรอกรหัสผ่านอีกครั้ง"
              value={confirmPassword}
              onValueChange={setConfirmPassword}
              required
              variant="bordered"
            />
            
            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              color="primary" 
              className="w-full bg-[#2F5D86]"
              isLoading={loading}
            >
              สมัครสมาชิก
            </Button>
          </form>
        </CardBody>
        <CardFooter className="justify-center">
          <p className="text-sm text-gray-500">
            มีบัญชีอยู่แล้ว?{" "}
            <Link href="/signIn" className="text-[#2F5D86] font-semibold hover:underline">
              เข้าสู่ระบบ
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpPage;
