import React from "react";
import { LunaSettings, LunaButtonSetting } from "@luna/ui";
import { openWindow } from ".";

export const Settings = () => {
	return (
		<LunaSettings>
			<LunaButtonSetting
				title="Open Playing Track Window for OBS"
				desc="Opens an external window to view the track that is playing."
				onClick={openWindow}
				children="Open Playing Track Window"
			/>
		</LunaSettings>
	);
};