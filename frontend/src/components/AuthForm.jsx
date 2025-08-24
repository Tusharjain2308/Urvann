import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card.jsx"
import { Button } from "../components/ui/Button.jsx"
import { Input } from "../components/ui/Input.jsx"
import { Label } from "../components/ui/Label.jsx"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs.jsx"
import { Leaf, Mail, Lock, User, Eye, EyeOff } from "lucide-react"

export default function AuthPage({role}) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: role || "user",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/5 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating botanical elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-primary/20 animate-float">
          <Leaf size={40} className="animate-leaf-sway" />
        </div>
        <div className="absolute top-40 right-20 text-accent/20 animate-float" style={{ animationDelay: "1s" }}>
          <Leaf size={32} className="animate-leaf-sway" style={{ animationDelay: "2s" }} />
        </div>
        <div className="absolute bottom-32 left-20 text-primary/15 animate-float" style={{ animationDelay: "2s" }}>
          <Leaf size={48} className="animate-leaf-sway" style={{ animationDelay: "1s" }} />
        </div>
        <div className="absolute bottom-20 right-10 text-accent/15 animate-float" style={{ animationDelay: "0.5s" }}>
          <Leaf size={36} className="animate-leaf-sway" style={{ animationDelay: "3s" }} />
        </div>
      </div>

      <div className="w-full max-w-md animate-fade-in-up">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4 shadow-lg">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Urvann</h1>
          <p className="text-muted-foreground">Your botanical paradise awaits</p>
        </div>

        <Tabs
          value={isLogin ? "login" : "register"}
          onValueChange={(value) => setIsLogin(value === "login")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login" className="transition-all duration-200">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="transition-all duration-200">
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-serif text-center">Welcome back</CardTitle>
                <CardDescription className="text-center">Sign in to your garden of possibilities</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10 transition-all duration-200 focus:scale-[1.02] focus:ring-2 focus:ring-ring"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10 pr-10 transition-all duration-200 focus:scale-[1.02] focus:ring-2 focus:ring-ring"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-serif text-center">Join Urvann</CardTitle>
                <CardDescription className="text-center">
                  Create your account and start your plant journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium">
                      Username
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Choose a username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="pl-10 transition-all duration-200 focus:scale-[1.02] focus:ring-2 focus:ring-ring"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-sm font-medium">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10 transition-all duration-200 focus:scale-[1.02] focus:ring-2 focus:ring-ring"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10 pr-10 transition-all duration-200 focus:scale-[1.02] focus:ring-2 focus:ring-ring"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}
