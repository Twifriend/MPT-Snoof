//import { DependencyContainer } from "tsyringe";
import { DependencyContainer } from "@spt/models/external/tsyringe";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";

class realisticThermalScopes implements IPostDBLoadMod {
	public postDBLoad(container: DependencyContainer): void {

		const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
		const tables: IDatabaseTables = databaseServer.getTables();

		const reapir = tables.templates.items["5a1eaa87fcdbcb001865f75e"];
		reapir._props.Zooms[0] = [9.6, 1.2]; //zoom displayed in lower right corner. True zoom is x5.8 - x0.7
		reapir._props.AimSensitivity[0] = [0.112, 0.93]; //sensitivity change. Calculated based on true zoom.
	}
}

export const mod = new realisticThermalScopes();