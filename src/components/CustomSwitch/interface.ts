export interface CustomSwitchProps {
    checked?: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>, setIsCheked: React.Dispatch<React.SetStateAction<number>>) => void
}