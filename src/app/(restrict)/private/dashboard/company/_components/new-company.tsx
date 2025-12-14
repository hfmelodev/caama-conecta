'use client'

import { Save, Upload } from 'lucide-react'
import { ImSpinner2 } from 'react-icons/im'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { Category, City } from '@/generated/prisma/client'
import { createCompany } from '../_actions/create-company'
import { type NewCompanyFormType, useNewCompanyForm } from './new-company-form'

interface NewCompanyProps {
  cities: City[]
  categories: Category[]
}

export function NewCompany({ cities, categories }: NewCompanyProps) {
  const form = useNewCompanyForm({
    name: '',
    slug: '',
    description: '',
    phone: '',
    whatsapp: '',
    email: '',
    website: '',
    address: '',
    neighborhood: '',
    zipCode: '',
    discount: 0,
    benefits: '',
    cityId: '',
    categoryId: '',
  })

  async function handleNewCompany(data: NewCompanyFormType) {
    const response = await createCompany(data)

    if (response.error) {
      toast.error(response.error)
      return
    }

    toast.success(response.message)
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col p-4">
      <Card className="pt-0">
        <CardHeader className="flex flex-col rounded-t-xl bg-linear-to-r from-primary to-sky-600 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <CardTitle className="text-muted text-xl">Nova Empresa Conveniada</CardTitle>
            <CardDescription className="text-muted">Preencha os dados e adicione a logo da empresa</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(handleNewCompany)}>
              {/* Upload Area */}
              <div className="mx-auto max-w-md px-8">
                <input type="file" accept="image/*" id="file" className="hidden" />

                <button
                  type="button"
                  className="w-full cursor-pointer rounded-xl border-2 border-primary/40 border-dashed p-8 transition-all hover:border-primary hover:bg-primary/5"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-foreground text-sm">Clique para enviar ou arraste a imagem</p>
                      <p className="mt-1 text-muted-foreground text-xs">PNG, JPG, GIF até 5MB</p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Informações Básicas */}
              <div className="space-y-4 border-border border-t pt-8">
                <h2 className="font-bold text-foreground text-lg">Informações Básicas</h2>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Nome da Empresa <span className="mt-0.5 text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Clínica Vida Plena" {...field} className="rounded-sm placeholder:text-sm" />
                        </FormControl>

                        <FormMessage className="text-destructive text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Slug (URL) <span className="mt-0.5 text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: clínica-vida-plena" {...field} className="rounded-sm placeholder:text-sm" />
                        </FormControl>

                        <FormMessage className="text-destructive text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Descrição <span className="mt-0.5 text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Breve descrição da empresa"
                          {...field}
                          className="h-28 rounded-sm placeholder:text-sm"
                        />
                      </FormControl>

                      <FormMessage className="text-destructive text-xs" />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="cityId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Cidade <span className="mt-0.5 text-destructive">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full rounded-sm">
                              <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent className="rounded-sm" defaultValue={field.value}>
                            {cities.map(city => (
                              <SelectItem key={city.id} value={city.id}>
                                {city.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Categoria <span className="mt-0.5 text-destructive">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full rounded-sm">
                              <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent className="rounded-sm" defaultValue={field.value}>
                            {categories.map(category => (
                              <SelectItem key={category.id} value={category.id}>
                                <>
                                  <span>{category.icon}</span>
                                  <p>{category.name}</p>
                                </>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Contato */}
              <div className="space-y-4 border-border border-t pt-8">
                <h2 className="font-bold text-foreground text-lg">Contato</h2>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field, formState: { errors } }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: (98) 3234-5678" {...field} className="rounded-sm placeholder:text-sm" />
                        </FormControl>

                        {errors.phone ? (
                          <FormMessage className="text-destructive text-xs" />
                        ) : (
                          <FormDescription className="text-muted-foreground text-xs">
                            Formato: DDD + número (somente números)
                          </FormDescription>
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field, formState: { errors } }) => (
                      <FormItem>
                        <FormLabel>WhatsApp</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: (98) 98329-1170" {...field} className="rounded-sm placeholder:text-sm" />
                        </FormControl>

                        {errors.whatsapp ? (
                          <FormMessage className="text-destructive text-xs" />
                        ) : (
                          <FormDescription className="text-muted-foreground text-xs">
                            Formato: DDD + número (somente números)
                          </FormDescription>
                        )}
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email <span className="mt-0.5 text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: contato@empresa.com.br" {...field} className="rounded-sm placeholder:text-sm" />
                        </FormControl>

                        <FormMessage className="text-destructive text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Website <span className="mt-0.5 text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: https://empresa.com.br" {...field} className="rounded-sm placeholder:text-sm" />
                        </FormControl>

                        <FormMessage className="text-destructive text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Endereço */}
              <div className="space-y-4 border-border border-t pt-8">
                <h2 className="font-bold text-foreground text-lg">Endereço</h2>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Logradouro <span className="mt-0.5 text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Rua, Avenida, etc." {...field} className="rounded-sm placeholder:text-sm" />
                      </FormControl>

                      <FormMessage className="text-destructive text-xs" />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="neighborhood"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Bairro <span className="mt-0.5 text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Centro" {...field} className="rounded-sm placeholder:text-sm" />
                        </FormControl>

                        <FormMessage className="text-destructive text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          CEP <span className="mt-0.5 text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 65010-000" {...field} className="rounded-sm placeholder:text-sm" />
                        </FormControl>

                        <FormMessage className="text-destructive text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Benefícios */}
              <div className="space-y-4 border-border border-t pt-8">
                <h2 className="font-bold text-foreground text-lg">Benefícios</h2>

                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Desconto em % <span className="mt-0.5 text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: 20"
                          type="number"
                          min={0}
                          max={100}
                          value={field.value}
                          onChange={e => field.onChange(Number(e.target.value))}
                          className="w-1/2 rounded-sm placeholder:text-sm"
                        />
                      </FormControl>

                      <FormMessage className="text-destructive text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="benefits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Descrição Detalhada dos Benefícios <span className="mt-0.5 text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Descreva todos os benefícios oferecidos aos advogados..."
                          {...field}
                          className="h-28 rounded-sm placeholder:text-sm"
                        />
                      </FormControl>

                      <FormMessage className="text-destructive text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>

                      <FormLabel className="text-sm">Empresa em destaque</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-3 border-border border-t pt-8">
                {form.formState.isSubmitting ? (
                  <Button type="submit" className="flex-1 select-none disabled:opacity-100" disabled>
                    <ImSpinner2 className="animate-spin" />
                    Criando Empresa...
                  </Button>
                ) : (
                  <Button type="submit" className="flex-1">
                    <Save />
                    Criar Empresa
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}
