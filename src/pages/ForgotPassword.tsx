import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PublicLayout from '@/layouts/PublicLayout';
// import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Mock forgot password for demo
        setTimeout(() => {
            setIsLoading(false);
            toast.success('Se ha enviado un enlace de recuperación a tu correo (Demo)');
            // navigate('/login'); 
        }, 1500);

        /* Supabase Logic Disabled
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });
            
            if (error) throw error;

            toast.success('Se ha enviado un enlace de recuperación a tu correo');
            // navigate('/login'); // Optional: redirect or let them verify
        } catch (error: any) {
            toast.error(error.message || 'Error al enviar correo de recuperación');
        } finally {
            setIsLoading(false);
        }
        */
    };

    return (
        <PublicLayout>
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <Leaf className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">
                            Recuperar Contraseña
                        </h1>
                        <p className="text-gray-600">
                            Te ayudaremos a recuperar el acceso a tu cuenta
                        </p>
                    </div>

                    <Card className="shadow-natural-lg">
                        <CardHeader>
                            <CardTitle>¿Olvidaste tu contraseña?</CardTitle>
                            <CardDescription>
                                Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="tu@email.com"
                                            className="pl-10"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-forest text-white h-11"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Enviando...' : 'Enviar Enlace de Recuperación'}
                                </Button>

                                <div className="text-center mt-4">
                                    <Link
                                        to="/login"
                                        className="inline-flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Volver al inicio de sesión
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PublicLayout>
    );
}
