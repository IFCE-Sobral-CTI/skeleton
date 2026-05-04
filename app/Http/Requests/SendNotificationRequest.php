<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SendNotificationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isAdmin();
    }

    public function rules(): array
    {
        return [
            'target' => ['required', 'in:all,permission,users'],
            'permission_id' => ['exclude_unless:target,permission', 'required', 'exists:permissions,id'],
            'user_ids' => ['exclude_unless:target,users', 'required', 'array', 'min:1'],
            'user_ids.*' => ['exclude_unless:target,users', 'exists:users,id'],
            'title' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:1000'],
            'type' => ['required', 'in:info,success,warning,danger'],
            'url' => ['nullable', 'url', 'max:500'],
            'send_email' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'target.required' => 'Selecione os destinatários.',
            'target.in' => 'Destinatário inválido.',
            'permission_id.required' => 'Selecione uma permissão.',
            'permission_id.exists' => 'Permissão não encontrada.',
            'user_ids.required' => 'Selecione ao menos um usuário.',
            'user_ids.min' => 'Selecione ao menos um usuário.',
            'user_ids.*.exists' => 'Um ou mais usuários não foram encontrados.',
            'title.required' => 'O título é obrigatório.',
            'title.max' => 'O título deve ter no máximo 255 caracteres.',
            'message.required' => 'A mensagem é obrigatória.',
            'message.max' => 'A mensagem deve ter no máximo 1000 caracteres.',
            'type.required' => 'Selecione o tipo da notificação.',
            'type.in' => 'Tipo de notificação inválido.',
            'url.url' => 'O link deve ser uma URL válida.',
            'url.max' => 'O link deve ter no máximo 500 caracteres.',
        ];
    }
}
