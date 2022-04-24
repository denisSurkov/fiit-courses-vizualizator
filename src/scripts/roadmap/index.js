import {RoadmapDrawer} from "./roadmap-drawer.js";

const roadmapDrawer = new RoadmapDrawer(JSON.parse("[\n" +
    "  {\n" +
    "    \"mode\": \"theme\",\n" +
    "    \"title\": \"Интернет\",\n" +
    "    \"children\": [\n" +
    "      {\n" +
    "        \"mode\": \"module\",\n" +
    "        \"title\": \"Bla bla\",\n" +
    "        \"infoPath\": \"a/bla.md\"\n" +
    "      },\n" +
    "      {\n" +
    "        \"mode\": \"module\",\n" +
    "        \"title\": \"Bla bla\",\n" +
    "        \"infoPath\": \"a/bla.md\"\n" +
    "      }\n" +
    "    ]\n" +
    "  },\n" +
    "  {\n" +
    "    \"mode\": \"theme\",\n" +
    "    \"type\": \"center|left|right\",\n" +
    "    \"title\": \"Интернет\",\n" +
    "    \"children\": [\n" +
    "      {\n" +
    "        \"mode\": \"module\",\n" +
    "        \"title\": \"Bla bla\",\n" +
    "        \"infoPath\": \"a/bla.md\"\n" +
    "      },\n" +
    "      {\n" +
    "        \"mode\": \"module\",\n" +
    "        \"title\": \"Bla bla\",\n" +
    "        \"infoPath\": \"a/bla.md\"\n" +
    "      },\n" +
    "      {\n" +
    "        \"mode\": \"module\",\n" +
    "        \"title\": \"Bla bla\",\n" +
    "        \"infoPath\": \"a/bla.md\"\n" +
    "      },\n" +
    "      {\n" +
    "        \"mode\": \"module\",\n" +
    "        \"title\": \"Bla bla\",\n" +
    "        \"infoPath\": \"a/bla.md\"\n" +
    "      },\n" +
    "      {\n" +
    "        \"mode\": \"module\",\n" +
    "        \"title\": \"Bla bla\",\n" +
    "        \"infoPath\": \"a/bla.md\"\n" +
    "      }\n" +
    "    ]\n" +
    "  }\n" +
    "]"));
const elementToShow = roadmapDrawer.run();


const pathHolder = document.getElementById('path-holder');

pathHolder.appendChild(elementToShow);

