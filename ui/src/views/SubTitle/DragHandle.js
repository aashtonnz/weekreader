import React from "react";
import { SortableHandle } from "react-sortable-hoc";
import { faGripLines as gripIcon } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "./styled";

const DragHandle = SortableHandle(() => {
  return <Icon icon={gripIcon} />;
});

export default DragHandle;
