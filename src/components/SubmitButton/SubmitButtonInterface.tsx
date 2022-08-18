import IAppButtonProps from "../AppButton/AppButtonInterface"

export default interface ISubmitButtonProps extends IAppButtonProps {
    onClick: (e: any) => Promise<string>
}