'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginWithGoogle, loginWithPassword } from '@/lib/pocketbase-service'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
    }),
})

export function LoginForm() {
    const router = useRouter()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            await loginWithPassword(data.email, data.password)
            toast.success('Logged in successfully!')
            router.push('/dashboard')
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'An unknown error occurred'
            toast.error('Login failed', {
                description: errorMessage,
            })
        }
    }

    async function handleGoogleLogin() {
        try {
            await loginWithGoogle()
            toast.success('Logged in successfully with Google!')
            router.push('/dashboard')
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'An unknown error occurred'
            toast.error('Google login failed', {
                description: errorMessage,
            })
        }
    }

    return (
        <div className="flex w-full flex-col items-center justify-center space-y-4 px-8 sm:w-auto sm:min-w-lg">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="email@example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </form>
            </Form>
            <div className="w-full">
                <Button
                    onClick={handleGoogleLogin}
                    variant="outline"
                    className="w-full"
                >
                    Login with Google
                </Button>
            </div>
        </div>
    )
}
