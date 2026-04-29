import React, { useCallback, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import {
    Bold, Italic, Underline as UnderlineIcon, Strikethrough,
    Link as LinkIcon, List, ListOrdered, AlignLeft, AlignCenter,
    AlignRight, Quote, Undo, Redo, Heading2, Heading3, Code,
} from 'lucide-react';

function ToolbarButton({ onClick, active, title, disabled, children }) {
    return (
        <button
            type="button"
            onMouseDown={e => { e.preventDefault(); onClick(); }}
            disabled={disabled}
            title={title}
            className={[
                'inline-flex items-center justify-center w-8 h-8 rounded text-sm transition-colors',
                active   ? 'bg-green-100 text-green-700' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
                disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
            ].join(' ')}
        >
            {children}
        </button>
    );
}

function Divider() {
    return <div className="w-px h-5 bg-neutral-200 mx-1 self-center" />;
}

export default function Editor({ handleChange, value, name }) {
    // Ref keeps the latest callback without recreating the editor
    const onChangeRef = useRef(handleChange);
    onChangeRef.current = handleChange;

    const editor = useEditor({
        immediatelyRender: true,
        extensions: [
            StarterKit,
            Underline,
            Link.configure({ openOnClick: false }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Placeholder.configure({ placeholder: 'Digite a resposta…' }),
        ],
        content: value ?? '',
        editorProps: {
            attributes: { class: 'tiptap-content min-h-[180px] p-3 focus:outline-none' },
        },
        onUpdate({ editor }) {
            onChangeRef.current({ target: { name, value: editor.getHTML() } });
        },
    });

    const setLink = useCallback(() => {
        if (!editor) return;
        const prev = editor.getAttributes('link').href ?? '';
        const url  = window.prompt('URL do link', prev);
        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    if (!editor) return null;

    return (
        <div className="border border-neutral-300 rounded-lg overflow-hidden focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-200 transition">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 bg-neutral-50 border-b border-neutral-200">

                <ToolbarButton
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    title="Desfazer"
                ><Undo size={15} /></ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    title="Refazer"
                ><Redo size={15} /></ToolbarButton>

                <Divider />

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    active={editor.isActive('heading', { level: 2 })}
                    title="Título H2"
                ><Heading2 size={15} /></ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    active={editor.isActive('heading', { level: 3 })}
                    title="Título H3"
                ><Heading3 size={15} /></ToolbarButton>

                <Divider />

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    active={editor.isActive('bold')}
                    title="Negrito"
                ><Bold size={15} /></ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    active={editor.isActive('italic')}
                    title="Itálico"
                ><Italic size={15} /></ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    active={editor.isActive('underline')}
                    title="Sublinhado"
                ><UnderlineIcon size={15} /></ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    active={editor.isActive('strike')}
                    title="Tachado"
                ><Strikethrough size={15} /></ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    active={editor.isActive('code')}
                    title="Código inline"
                ><Code size={15} /></ToolbarButton>

                <Divider />

                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    active={editor.isActive({ textAlign: 'left' })}
                    title="Alinhar à esquerda"
                ><AlignLeft size={15} /></ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    active={editor.isActive({ textAlign: 'center' })}
                    title="Centralizar"
                ><AlignCenter size={15} /></ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    active={editor.isActive({ textAlign: 'right' })}
                    title="Alinhar à direita"
                ><AlignRight size={15} /></ToolbarButton>

                <Divider />

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    active={editor.isActive('bulletList')}
                    title="Lista com marcadores"
                ><List size={15} /></ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    active={editor.isActive('orderedList')}
                    title="Lista numerada"
                ><ListOrdered size={15} /></ToolbarButton>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    active={editor.isActive('blockquote')}
                    title="Citação"
                ><Quote size={15} /></ToolbarButton>

                <Divider />

                <ToolbarButton
                    onClick={setLink}
                    active={editor.isActive('link')}
                    title="Inserir link"
                ><LinkIcon size={15} /></ToolbarButton>
            </div>

            {/* Área editável */}
            <EditorContent editor={editor} />
        </div>
    );
}
