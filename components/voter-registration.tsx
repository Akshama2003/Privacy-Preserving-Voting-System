"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Shield, Key, CheckCircle, AlertCircle } from "lucide-react"

export function VoterRegistration() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    voterId: "",
    publicKey: "",
    privateKey: "",
    zkProof: "",
  })
  const [isGenerating, setIsGenerating] = useState(false)

  const generateKeys = async () => {
    setIsGenerating(true)
    // Simulate key generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setFormData((prev) => ({
      ...prev,
      publicKey: "pk_" + Math.random().toString(36).substring(2, 15),
      privateKey: "sk_" + Math.random().toString(36).substring(2, 15),
      zkProof: "zk_" + Math.random().toString(36).substring(2, 15),
    }))
    setIsGenerating(false)
    setStep(3)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      generateKeys()
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Voter Registration
          </CardTitle>
          <CardDescription>Register securely with cryptographic identity verification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Progress value={(step / 3) * 100} className="w-full" />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>Personal Info</span>
              <span>Identity Verification</span>
              <span>Cryptographic Setup</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="voterId">Voter ID</Label>
                  <Input
                    id="voterId"
                    value={formData.voterId}
                    onChange={(e) => setFormData((prev) => ({ ...prev, voterId: e.target.value }))}
                    placeholder="Enter your voter ID"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Continue to Verification
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    We will now generate your cryptographic keys and zero-knowledge proof. This ensures your identity
                    can be verified without revealing personal information.
                  </AlertDescription>
                </Alert>

                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <h4 className="font-medium">Identity Verification Process:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Generate public/private key pair</li>
                    <li>• Create zero-knowledge proof of eligibility</li>
                    <li>• Register anonymous voting credentials</li>
                  </ul>
                </div>

                <Button type="button" onClick={generateKeys} className="w-full" disabled={isGenerating}>
                  {isGenerating ? "Generating Keys..." : "Generate Cryptographic Keys"}
                </Button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Registration successful! Your cryptographic credentials have been generated.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Public Key</Label>
                    <div className="flex items-center gap-2">
                      <Input value={formData.publicKey} readOnly />
                      <Badge variant="secondary">
                        <Key className="h-3 w-3 mr-1" />
                        Public
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Private Key (Keep Secret)</Label>
                    <div className="flex items-center gap-2">
                      <Input value={formData.privateKey} readOnly type="password" />
                      <Badge variant="destructive">
                        <Shield className="h-3 w-3 mr-1" />
                        Secret
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Zero-Knowledge Proof</Label>
                    <div className="flex items-center gap-2">
                      <Input value={formData.zkProof} readOnly />
                      <Badge variant="outline">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Important:</strong> Save your private key securely. You'll need it to vote. Your
                    zero-knowledge proof allows verification of your eligibility without revealing your identity.
                  </AlertDescription>
                </Alert>

                <Button className="w-full" onClick={() => setStep(1)}>
                  Register Another Voter
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
