import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { AlertCircle, Check, Lightbulb, X } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
import "./callout.css";

const calloutIcons: Record<string, string | any> = {
  note: Lightbulb,
  caution: AlertCircle,
  error: X,
  success: Check,
};

const calloutItems = [
  { name: "note", label: "Note", icon: calloutIcons["note"] },
  { name: "caution", label: "Caution", icon: calloutIcons["caution"] },
  { name: "error", label: "Error", icon: calloutIcons["error"] },
  { name: "success", label: "Success", icon: calloutIcons["success"] },
];

export const Callout = (props: any) => {
  const { label, name } = props.node.attrs;

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(label);
  const Icon = calloutIcons[name];

  const changeName = (nameToUpdate: string, labelToUpdate: string) => {
    if (!props.editor.isEditable) return;

    props.updateAttributes({
      name: nameToUpdate,
    });
    if (calloutItems.map((i) => i.label).includes(label)) {
      props.updateAttributes({
        label: labelToUpdate,
      });
      setText(labelToUpdate);
    }
  };

  const handleDoubleClick = () => {
    if (!props.editor.isEditable) return;
    setIsEditing(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (text !== label && text.length > 0) {
      props.updateAttributes({
        label: text,
      });
    }
  };

  return (
    <NodeViewWrapper
      className={`content ${name} relative my-3 flex flex-col gap-1 rounded border-l-4 px-2 py-2 prose-headings:my-3 prose-p:my-1.5`}
      as="aside"
    >
      <div className="flex items-center gap-1" contentEditable={false}>
        <DropdownMenu>
          <DropdownMenuTrigger
            disabled={!props.editor.isEditable}
            className="rounded p-1 transition-all hover:bg-neutral-50/5 focus:outline-none active:scale-90 active:bg-neutral-50/5"
          >
            <Icon className={`icon ${name} h-4 w-4`} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {calloutItems.map((item) => (
              <DropdownMenuItem
                key={item.name}
                onClick={() => changeName(item.name, item.label)}
              >
                <div className="flex items-center gap-2">
                  <item.icon className={`icon h-4 w-4 ${item.name}`} />
                  {item.label}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div
          onDoubleClick={handleDoubleClick}
          className={`icon ${name} font-semibold`}
        >
          {isEditing ? (
            <input
              autoFocus
              type="text"
              value={text}
              onChange={handleChange}
              onBlur={handleBlur}
              className="bg-transparent focus:outline-none"
            />
          ) : (
            <span>{label}</span>
          )}
        </div>
      </div>
      <div className="px-1">
        <NodeViewContent />
      </div>
    </NodeViewWrapper>
  );
};
