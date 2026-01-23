import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PublicLayout from '@/layouts/PublicLayout';
// import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function ResetPassword() {
    const [passwords, setPasswords] = useState({
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    /* Supabase Logic Disabled
    useEffect(() => {
        // Optional: Check if we have a session (hash fragment)
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'PASSWORD_RECOVERY') {
                // User is in password recovery mode
            }
        });
    }, []);
    */

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwords.password !== passwords.confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        }

        if (passwords.password.length < 8) {
            toast.error('La contraseña debe tener al menos 8 caracteres');
            return;
        }

        setIsLoading(true);

        // Mock password update for demo
        setTimeout(() => {
            setIsLoading(false);
            toast.success('Contraseña actualizada exitosamente (Demo)');
            navigate('/login');
        }, 1500);

        /* Supabase Logic Disabled
        try {
            const { error } = await supabase.auth.updateUser({
                password: passwords.password
            });

            if (error) throw error;

            toast.success('Contraseña actualizada exitosamente');
            navigate('/login');
        } catch (error: any) {
            toast.error(error.message || 'Error al actualizar contraseña');
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
                            Nueva Contraseña
                        </h1>
                        <p className="text-gray-600">
                            Ingresa tu nueva contraseña para volver a acceder
                        </p>
                    </div>

                    <Card className="shadow-natural-lg">
                        <CardHeader>
                            <CardTitle>Restablecer Contraseña</CardTitle>
                            <CardDescription>
                                Por favor ingresa y confirma tu nueva contraseña.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="password">Nueva Contraseña</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            className="pl-10"
                                            value={passwords.password}
                                            onChange={(e) => setPasswords({ ...passwords, password: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="••••••••"
                                            className="pl-10"
                                            value={passwords.confirmPassword}
                                            onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-forest text-white h-11"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Actualizando...' : 'Cambiar Contraseña'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PublicLayout>
    );
}
