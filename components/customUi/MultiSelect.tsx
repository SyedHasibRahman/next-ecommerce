import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { useState } from "react"
import { Badge } from "../ui/badge";
import { X } from "lucide-react";
import { Button } from "../ui/button";


interface MultiSelectProps {
    placeholder: string,
    collections: CollectionType[],
    value: string[],
    onChange: (value: string) => void,
    onRemove: (value: string) => void
}
export const MultiSelect: React.FC<MultiSelectProps> = ({ placeholder, collections, value, onChange, onRemove }) => {

    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);
    let selected: CollectionType[]
    if (value.length === 0) {
        selected = []
    } else {
        selected = value.map((id) => collections.find((collection) => collection._id === id)) as CollectionType[]
    }

    const selectables = collections.filter((collection) => !selected.includes(collection));
    console.log('value', value)
    return (
        <Command className="overflow-visible bg-white">
            <div>
                <div>
                    {selected.map((collection) => (
                        <Badge key={collection._id}>{collection.title}
                            <button className="ml-1 hover:bg-red-500 rounded-full " onClick={() => onRemove(collection._id)}>
                                <X className="hover:text-white h-4 w-4" />
                            </button>
                        </Badge>
                    ))}
                </div>
                <CommandInput placeholder={placeholder}
                    value={inputValue} onValueChange={setInputValue}
                    onBlur={() => setOpen(false)}
                    onFocus={() => setOpen(true)}
                />
            </div>

            <div className="mt-2 relative">
                {open && (
                    <CommandGroup className="absolute w-full z-10 top-0 overflow-auto border rounded-md shadow-md">
                        {selectables.map((collection) => (
                            <CommandItem key={collection._id}
                                onMouseDown={(e) => e.preventDefault()}
                                onSelect={() => { onChange(collection._id) }}
                                className="hover:bg-grey-2 cursor-pointer"
                            >
                                {collection.title}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}
            </div>
        </Command>

    )
}
