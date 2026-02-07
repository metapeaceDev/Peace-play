"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input, Button, Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // Redirect to home page after login
    } catch (err: any) {
      console.error(err);
      setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ: " + (err.message || "โปรดตรวจสอบข้อมูลอีกครั้ง"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="flex flex-col gap-1 items-center">
          <h1 className="text-2xl font-bold text-[#2F5D86]">เข้าสู่ระบบ Peace Play</h1>
          <p className="text-sm text-gray-500">ยินดีต้อนรับกลับเข้าสู่ระบบ</p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
              placeholder="กรอกรหัสผ่านของคุณ"
              value={password}
              onValueChange={setPassword}
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
              เข้าสู่ระบบ
            </Button>
          </form>
        </CardBody>
        <CardFooter className="justify-center">
          <p className="text-sm text-gray-500">
            ยังไม่มีบัญชีใช่หรือไม่?{" "}
            <Link href="/signUp" className="text-[#2F5D86] font-semibold hover:underline">
              สมัครสมาชิก
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInPage;
