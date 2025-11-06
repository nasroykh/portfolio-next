import { Tooltip, TooltipTrigger, TooltipContent } from "./tooltip";

export const TooltipWrapper = ({
	children,
	content,
	delayDuration = 0,
	...props
}: React.ComponentProps<typeof Tooltip> & {
	children: React.ReactNode;
	content: string;
	delayDuration?: number;
}) => {
	return (
		<Tooltip delayDuration={delayDuration} {...props}>
			<TooltipTrigger asChild>{children}</TooltipTrigger>
			<TooltipContent>
				<p>{content}</p>
			</TooltipContent>
		</Tooltip>
	);
};
